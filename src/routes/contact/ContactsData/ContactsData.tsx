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
  href: string
  blank: boolean
  icon: FC<SVGProps<SVGSVGElement>>
}[] = [
  {
    label: '(111) 111-1111',
    href: 'tel:1111111111',
    blank: false,
    icon: PhoneIcon,
  },
  {
    label: 'info@luminarcapital.com',
    href: 'mailto:info@luminarcapital.com',
    blank: false,
    icon: MailIcon,
  },
  {
    label: '25 SE 2nd Ave Ste 550 Miami, FL 33131',
    href: 'https://www.google.com/maps/place/25+SE+2nd+Ave+%23550,+Miami,+FL+33131,+%D0%A1%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D1%96+%D0%A8%D1%82%D0%B0%D1%82%D0%B8+%D0%90%D0%BC%D0%B5%D1%80%D0%B8%D0%BA%D0%B8/@25.7737406,-80.1900783,17z/data=!3m1!4b1!4m6!3m5!1s0x88d9b7d4f5945903:0x478ec6c18844dfbc!8m2!3d25.7737406!4d-80.1900783!16s%2Fg%2F11vwm3dn4n?entry=ttu&g_ep=EgoyMDI0MDkyMi4wIKXMDSoASAFQAw%3D%3D',
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
