import './Contact.scss'

function Contact() {
  return (
    <section className="section-standar contact" id="contacto">
      <h2 className="contact__title">
        ¿LISTO PARA<br />COMER EN SERIO?
      </h2>
      <p className="contact__sub">
        Hacé tu pedido o contactanos para eventos y catering
      </p>
      <a
        href="https://wa.me/5491100000000"
        className="contact__btn"
        target="_blank"
        rel="noreferrer"
      >
        Escribinos por WhatsApp
      </a>
    </section>
  )
}

export default Contact