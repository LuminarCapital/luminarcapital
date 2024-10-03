import { FC, SVGProps, createElement } from 'react'
import classNames from 'classnames'
import PhoneIcon from '@/ui/icons/Phone'
import MailIcon from '@/ui/icons/Mail'
import MarkerIcon from '@/ui/icons/Marker'
import styles from './ContactsData.module.scss'

interface IContactsData {
  className?: string
}

const contacts: {
  label: string
  href?: string
  blank: boolean
  icon: FC<SVGProps<SVGSVGElement>>
}[] = [
  {
    label: '(111) 111-1111',
    blank: false,
    icon: PhoneIcon,
  },
  {
    label: 'info@luminarcapital.com',
    blank: false,
    icon: MailIcon,
  },
  {
    label: '25 SE 2nd Ave Ste 550 Miami, FL 33131',
    blank: true,
    icon: MarkerIcon,
  },
]

const ContactsData = ({ className }: IContactsData) => {
  return (
    <section className={classNames(styles['section'], className)}>
      <div className="content-block">
        <div className={styles['section-panel']}>
          {contacts.map((contact, index) => (
            <a
              key={`contact-link-${index}`}
              href={contact.href}
              className={styles['link']}
              target={contact.blank ? '_blank' : '_self'}
            >
              <span className={styles['link-icon']}>
                {createElement(contact.icon)}
              </span>
              <span className={styles['link-label']}>{contact.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ContactsData
