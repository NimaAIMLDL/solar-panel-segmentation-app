import React from 'react'
import MyPhoto from '@/assets/my-photo.jpeg'
import GitHubIcon from '@/assets/github-icon.svg'
import XingIcon from '@/assets/xing-icon.svg'
import LinkedInIcon from '@/assets/linkedin-icon.svg'
import MailIcon from '@/assets/mail-icon.png'

const AboutMeContent: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      {/* Profile Picture + Name */}
      <div className="text-center">
        <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 shadow-lg bg-white">
          <img
            src={MyPhoto}
            alt="My Photo"
            className="w-full h-full object-contain"
            style={{
              transform: 'scale(1.1)',
              objectPosition: '50% 40%',
            }}
          />
        </div>

        {/* Name and Title */}
        <h1 className="text-3xl font-extrabold">Nima Beygi</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          M.Sc. Electrical Engineering, University of Stuttgart
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-4 text-base leading-relaxed text-center">
        <p>
          I'm an AI software developer passionate about solving real-world problems. I have hands-on
          experience in machine learning, deep learning, computer vision, NLP, data science,
          reinforcement learning and full-stack software development.
        </p>
      </div>

      {/* Contact Links */}
      <div className="flex flex-col sm:flex-row sm:justify-center gap-4 pt-4 flex-wrap">
        <ContactLink
          href="mailto:nimabeigy@gmail.com"
          icon={
            <img
              src={MailIcon}
              alt="Contact"
              className="w-5 h-5 dark:invert"
            />
          }
          label="Contact"
        />
        <ContactLink
          href="https://www.linkedin.com/in/nima-beygi-75144760"
          icon={
            <img
              src={LinkedInIcon}
              alt="LinkedIn"
              className="w-5 h-5 dark:invert"
            />
          }
          label="LinkedIn"
        />
        <ContactLink
          href="https://github.com/NimaAIMLDL"
          icon={
            <img
              src={GitHubIcon}
              alt="GitHub"
              className="w-5 h-5 dark:invert"
            />
          }
          label="GitHub"
        />
        <ContactLink
          href="https://www.xing.com/profile/Nima_Beygi"
          icon={
            <img
              src={XingIcon}
              alt="Xing"
              className="w-5 h-5 dark:invert"
            />
          }
          label="Xing"
        />
      </div>
    </div>
  )
}

interface ContactLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

const ContactLink: React.FC<ContactLinkProps> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </a>
)

export default AboutMeContent
