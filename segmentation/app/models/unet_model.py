# Reference: https://github.com/zhixuhao/unet

import numpy as np
import tensorflow as tf


class UNetModel:
    def __init__(self, weights_path: str, input_size=(256, 256, 3)):
        self.input_size = input_size
        self.interpreter = tf.lite.Interpreter(model_path=weights_path)
        self.interpreter.allocate_tensors()

        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()

    def predict(self, preprocessed: np.ndarray) -> np.ndarray:
        """
        Takes a preprocessed batch of shape (1, H, W, 3) and returns a binary mask (H x W).
        """
        input_tensor = preprocessed.astype(self.input_details[0]["dtype"])
        self.interpreter.set_tensor(self.input_details[0]["index"], input_tensor)
        self.interpreter.invoke()

        output_data = self.interpreter.get_tensor(self.output_details[0]["index"])[0, :, :, 0]
        return (output_data > 0.5).astype(np.uint8)

    # === Not used in runtime: kept for reference ===
    def _build_unet(self):
        """
        This method defines the original U-Net architecture used to train.
        """
        from tensorflow.keras.models import Model
        from tensorflow.keras.layers import (
            Input, Conv2D, MaxPooling2D, Dropout,
            UpSampling2D, BatchNormalization, concatenate
        )
        from tensorflow.keras.optimizers import Adam
        from keras import backend as K

        inputs = Input(self.input_size)

        # --- Encoder ---
        conv1 = Conv2D(64, 3, activation='relu', padding='same', kernel_initializer='he_normal')(inputs)
        conv1 = Conv2D(64, 3, activation='relu', padding='same', kernel_initializer='he_normal')(conv1)
        conv1 = BatchNormalization()(conv1)
        pool1 = MaxPooling2D((2, 2))(conv1)

        conv2 = Conv2D(128, 3, activation='relu', padding='same', kernel_initializer='he_normal')(pool1)
        conv2 = Conv2D(128, 3, activation='relu', padding='same', kernel_initializer='he_normal')(conv2)
        conv2 = BatchNormalization()(conv2)
        pool2 = MaxPooling2D((2, 2))(conv2)

        conv3 = Conv2D(256, 3, activation='relu', padding='same', kernel_initializer='he_normal')(pool2)
        conv3 = Conv2D(256, 3, activation='relu', padding='same', kernel_initializer='he_normal')(conv3)
        conv3 = BatchNormalization()(conv3)
        pool3 = MaxPooling2D((2, 2))(conv3)

        conv4 = Conv2D(512, 3, activation='relu', padding='same', kernel_initializer='he_normal')(pool3)
        conv4 = Conv2D(512, 3, activation='relu', padding='same', kernel_initializer='he_normal')(conv4)
        conv4 = BatchNormalization()(conv4)
        drop4 = Dropout(0.5)(conv4)
        pool4 = MaxPooling2D((2, 2))(drop4)

        conv5 = Conv2D(1024, 3, activation='relu', padding='same', kernel_initializer='he_normal')(pool4)
        conv5 = Conv2D(1024, 3, activation='relu', padding='same', kernel_initializer='he_normal')(conv5)
        conv5 = BatchNormalization()(conv5)
        drop5 = Dropout(0.5)(conv5)

        # --- Decoder ---
        up6 = UpSampling2D((2, 2))(drop5)
        up6 = Conv2D(512, 2, activation='relu', padding='same', kernel_initializer='he_normal')(up6)
        up6 = BatchNormalization()(up6)
        merge6 = concatenate([drop4, up6], axis=3)
        conv6 = Conv2D(512, 3, activation='relu', padding='same', kernel_initializer='he_normal')(merge6)
        conv6 = Conv2D(512, 3, activation='relu', padding='same', kernel_initializer='he_normal')(conv6)
        conv6 = BatchNormalization()(conv6)

        up7 = UpSampling2D((2, 2))(conv6)
        up7 = Conv2D(256, 2, activation='relu', padding='same', kernel_initializer='he_normal')(up7)
        up7 = BatchNormalization()(up7)
        merge7 = concatenate([conv3, up7], axis=3)
        conv7 = Conv2D(256, 3, activation='relu', padding='same', kernel_initializer='he_normal')(merge7)
        conv7 = Conv2D(256, 3, activation='relu', padding='same', kernel_initializer='he_normal')(conv7)
        conv7 = BatchNormalization()(conv7)

        up8 = UpSampling2D((2, 2))(conv7)
        up8 = Conv2D(128, 2, activation='relu', padding='same', kernel_initializer='he_normal')(up8)
        up8 = BatchNormalization()(up8)
        merge8 = concatenate([conv2, up8], axis=3)
        conv8 = Conv2D(128, 3, activation='relu', padding='same', kernel_initializer='he_normal')(merge8)
        conv8 = Conv2D(128, 3, activation='relu', padding='same', kernel_initializer='he_normal')(conv8)
        conv8 = BatchNormalization()(conv8)

        up9 = UpSampling2D((2, 2))(conv8)
        up9 = Conv2D(64, 2, activation='relu', padding='same', kernel_initializer='he_normal')(up9)
        up9 = BatchNormalization()(up9)
        merge9 = concatenate([conv1, up9], axis=3)
        conv9 = Conv2D(64, 3, activation='relu', padding='same', kernel_initializer='he_normal')(merge9)
        conv9 = Conv2D(64, 3, activation='relu', padding='same', kernel_initializer='he_normal')(conv9)
        conv9 = Conv2D(2, 3, activation='relu', padding='same', kernel_initializer='he_normal')(conv9)
        conv9 = BatchNormalization()(conv9)

        conv10 = Conv2D(1, 1, activation='sigmoid')(conv9)

        model = Model(inputs=inputs, outputs=conv10)

        def iou(y_true, y_pred):
            y_true_f = K.flatten(y_true)
            y_pred_f = K.flatten(y_pred)
            intersection = K.sum(y_true_f * y_pred_f)
            union = K.sum(y_true_f) + K.sum(y_pred_f) - intersection
            return intersection / (union + K.epsilon())

        def iou_loss(y_true, y_pred):
            return 1.0 - iou(y_true, y_pred)

        model.compile(optimizer=Adam(learning_rate=1e-3), loss=iou_loss, metrics=[iou])
        return model
