const toggleActive = () =>{
    const allLabels = document.querySelectorAll(".condition-btn");

    if (!allLabels) return;

    const activeBtn = (e) => {
        const button = e.currentTarget;
        if (!button) return;

        allLabels.forEach(item => {
            item.classList.remove("active")
        })

        button.classList.add("active")
    }

    allLabels.forEach(item => {
        item.addEventListener( "click", activeBtn )
    })


}

document.addEventListener('DOMContentLoaded', toggleActive);