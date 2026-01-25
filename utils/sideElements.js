import { openLink } from "./methods"

const handleIconClick = (icon) => {
    const links = {
        'github': 'https://github.com/Umar8206',
        'instagram': 'https://www.instagram.com/mohammad_umar879/',
        // 'twitter': 'https://twitter.com/umerzubair879',
        'linkedin': 'https://www.linkedin.com/in/muhammad-umar8206/',
    }
    openLink(links[icon])
}

const sideElements = {
    emailButton: {
        label: 'umerzubair879@gmail.com',
        onClick: () => openLink('mailto:umerzubair879@gmail.com?subject=Hello')
    },
    handleIconClick,
}

export default sideElements