import gsap from "gsap";

document.addEventListener('DOMContentLoaded', () => {

    const addressDrawer = document.querySelector('#add-address-drawer');
    const overlay = document.querySelector('#add-address-overlay');
    const body = document.body;

    if (!addressDrawer || !overlay) {
        console.error("No se encontraron todos los elementos para el Add Address Drawer.");
        return;
    }

    const tl = gsap.timeline({ paused: true });

    tl.to(overlay, {
        opacity: 1,
        display: 'block',
        duration: 0.3,
        pointerEvents: 'auto'
    })
    .to(addressDrawer, {
        x: '0%',
        visibility: 'visible',
        duration: 0.4,
        ease: 'power2.inOut'
    }, "<");

    const openDrawer = () => {
        body.classList.add('address-drawer-open');
        tl.play();
    };

    const closeDrawer = () => {
        tl.reverse();
        tl.eventCallback("onReverseComplete", () => {
            body.classList.remove('address-drawer-open');
        });
    };

    window.addEventListener('open-address-drawer', openDrawer);
    window.addEventListener('close-address-drawer', closeDrawer);
});

