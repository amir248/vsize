function view_year(){
    return new Promise((resolve)=>{
        function year(){
            document.getElementById("year").textContent= new Date().getFullYear();
        }
        resolve(year());
    });
};

function click_menu(){
    return new Promise((resolve, reject)=>{
        function first(){
            // console.log('click');
            const toggleBtn = document.getElementById('menu-toggle');
            const menuList = document.getElementById('menu-list');

            toggleBtn.addEventListener('click', () => {
                menuList.classList.toggle('open');
            });
        }
    resolve(first());  
    });
}

// if (menuList) {
//     toggleBtn.addEventListener('click', () => {
//         menuList.classList.toggle('open');
//     });
// }

async function main(){
    await click_menu();
    await view_year();
}
main();