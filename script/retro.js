const discussSectionCard = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts")
    const data = await res.json();

    const mainSectionSectiondiv = document.getElementById('main-second-section-div');
    data.posts.forEach(item => {

        
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="bg-[rgb(243,243,245)] p-10 w-full h-[270px] flex gap-6 rounded-3xl border-2 border-[rgb(121,125,252)]">
        <div class="w-[90px] h-[80px] rounded-2xl bg-black relative">
            <img src="${item.image}" alt="" class="rounded-2xl">
            ${item.isActive == true ? '<p id="warnning-color" class="w-5 h-5 bg-[rgb(16,185,129)] rounded-full absolute -top-2 -right-2 border-2 border-white"></p>' : '<p id="warnning-color" class="w-5 h-5  rounded-full bg-[red] absolute -top-2 -right-2 border-2 border-white"></p>'}
        </div>
        <div class="w-full">
            <div class="text-sm font-medium text-[rgba(18,19,45,0.8)] flex gap-5">
                <p># ${item.category}</p>
                <p>Author : ${item.author.name}</p>
            </div>
            <div class="my-4">
                <h1 class="text-xl font-bold">${item.title}</h1>
            </div>
            <div>
                <p class="text-base text-[rgba(18,19,45,0.6)]">${item.description}</p>
            </div>
            <hr class="border border-dashed border-[rgba(18,19,45,0.25)] my-6">
            <div class="flex justify-between text-[rgba(18,19,45,0.6)]">
                <div class="flex gap-7">
                    <p><span><i class="fa-regular fa-message"></i></span> <span>${item.comment_count}</span></p>
                    <p><span><i class="fa-regular fa-eye"></i></span> <span>${item.view_count}</span></p>
                    <p><i class="fa-regular fa-clock"></i></span> <span>${item.posted_time} min</span></p>
                </div>
                <button onclick="messageButton('${item.title}', '${item.view_count}')" class="w-[28px] h-[28px] rounded-full bg-[rgb(16,185,129)] flex items-center justify-center">
                    <i class="fa-solid fa-envelope text-white"></i>
                </button>
            </div>
        </div>
    </div>
    `;

    mainSectionSectiondiv.appendChild(div);

    });
}



const messageButton = (title, view_count) => {
    const cardMessage = document.getElementById('card-message')
    const div2 = document.createElement('div');
    div2.innerHTML = `
    <div class="bg-white rounded-2xl w-[326px] h-[82px] flex justify-between items-center p-4 ">
        <p class="text-base font-semibold">${title}</p>
        <p class="text-[rgba(18,19,45,0.6)]"><span><i class="fa-regular fa-eye"></i></span> <span>${view_count}</span></p>
    </div>
    `
    cardMessage.appendChild(div2);

    const massageCount = document.getElementById('massage-count');
    const count = Number(massageCount.innerText)
    const countAdd = count + 1;
    massageCount.innerText = countAdd;
}

discussSectionCard();