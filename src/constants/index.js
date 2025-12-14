import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";

export const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#productos", label: "Productos" },
    { href: "#contacto", label: "Contacto" },
];

export const shoes = [
    {
        thumbnail: thumbnailShoe1,
        bigShoe: bigShoe1,
    },
    {
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
    },
    {
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
    },
];

export const statistics = [
    { value: '1k+', label: 'Marcas' },
    { value: '500+', label: 'Tiendas' },
    { value: '250k+', label: 'Clientes' },
];

export const products = [
    {
        imgURL: shoe4,
        name: "Nike Air Jordan-01",
        price: "$200.20",
    },
    {
        imgURL: shoe5,
        name: "Nike Air Jordan-10",
        price: "$210.20",
    },
    {
        imgURL: shoe6,
        name: "Nike Air Jordan-100",
        price: "$220.20",
    },
    {
        imgURL: shoe7,
        name: "Nike Air Jordan-001",
        price: "$230.20",
    },
];

export const services = [
    {
        imgURL: truckFast,
        label: "Envío gratuito",
        subtext: "Disfruta de una experiencia de compra sin complicaciones con nuestro servicio de envío gratuito."
    },
    {
        imgURL: shieldTick,
        label: "Pago seguro",
        subtext: "Experimenta transacciones sin preocupaciones con nuestras opciones de pago seguras."
    },
    {
        imgURL: support,
        label: "Nos encanta ayudarte",
        subtext: "Nuestro equipo dedicado está aquí para asistirte en cada paso del camino."
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "¡La atención al detalle y la calidad del producto superaron mis expectativas. Altamente recomendado!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "¡El producto no solo cumplió sino que superó mis expectativas. Definitivamente volveré a ser cliente!"
    }
];

export const footerLinks = [
    {
        title: "Productos",
        links: [
            { name: "Air Force 1", link: "/" },
            { name: "Air Max 1", link: "/" },
            { name: "Air Jordan 1", link: "/" },
            { name: "Air Force 2", link: "/" },
            { name: "Nike Waffle Racer", link: "/" },
            { name: "Nike Cortez", link: "/" },
        ],
    },
    {
        title: "Ayuda",
        links: [
            { name: "Sobre nosotros", link: "/" },
            { name: "Preguntas frecuentes", link: "/" },
            { name: "Cómo funciona", link: "/" },
            { name: "Política de privacidad", link: "/" },
            { name: "Política de pagos", link: "/" },
        ],
    },
    {
        title: "Contacto",
        links: [
            { name: "christiamaraujoh@gmail.com", link: "mailto:christiamaraujoh@gmail.com" },
            { name: "+51 940332707", link: "tel:+51940332707" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "logo de facebook" },
    { src: twitter, alt: "logo de twitter" },
    { src: instagram, alt: "logo de instagram" },
];
