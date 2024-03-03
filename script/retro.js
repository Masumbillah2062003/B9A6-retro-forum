

const discussSectionCard = async(idName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${idName}`)
    const data = await res.json();

    const mainSectionSectiondiv = document.getElementById('main-second-section-div');
    mainSectionSectiondiv.innerText = '';
    data.posts.forEach(item => {

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="bg-[rgb(243,243,245)] lg:p-10 p-5 w-full lg:h-[270px] flex lg:flex-row flex-col gap-6 rounded-3xl border-2 border-[rgb(121,125,252)] text-center lg:text-start">
        <div class="lg:w-[90px] lg:h-[80px] w-[50px] mx-auto rounded-2xl bg-black relative">
            <img src="${item.image}" alt="" class="rounded-2xl">
            ${item.isActive == true ? '<p id="warnning-color" class="w-5 h-5 bg-[rgb(16,185,129)] rounded-full absolute -top-2 -right-2 border-2 border-white"></p>' : '<p id="warnning-color" class="w-5 h-5  rounded-full bg-[red] absolute -top-2 -right-2 border-2 border-white"></p>'}
        </div>
        <div class="w-full">
            <div class="text-sm font-medium text-[rgba(18,19,45,0.8)] flex gap-5">
                <p># <span>${item.category}</span></p>
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
                <div class="flex lg:gap-7 gap-3">
                    <p><span><i class="fa-regular fa-message"></i></span> <span>${item.comment_count}</span></p>
                    <p><span><i class="fa-regular fa-eye"></i></span> <span>${item.view_count}</span></p>
                    <p><i class="fa-regular fa-clock"></i></span> <span>${item.posted_time} min</span></p>
                </div>
                <button onclick="messageButton('${item.title.replace("'", " ")}',${item.view_count})" class="w-[28px] h-[28px] rounded-full bg-[rgb(16,185,129)] flex items-center justify-center">
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
    <div class="bg-white rounded-2xl lg:w-[326px] h-[82px] flex justify-between items-center p-4 ">
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



discussSectionCard('');




const clickIdName = () => {
    const input = document.getElementById('input-field').value.toLowerCase();
    if(input == 'comedy' || input == 'coding' || input == 'music'){
        const loadingSection = document.getElementById('loading-section');
        loadingSection.classList.remove('hidden')
        setTimeout(() => {
            discussSectionCard(input);
            loadingSection.classList.add('hidden')
        }, 2000);
    }
    else{
        discussSectionCard(input);
    }
}







const latestPost = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();

    const latestPostCards = document.getElementById('latest-post-cards');
    data.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="border border-[rgba(18,19,45,0.15)] rounded-2xl lg:w-[374px] lg:p-6 p-3">
        <figure class="lg:w-[326px] lg:h-[190px] rounded-2xl bg-black">
            <img src="${item.cover_image}" alt="" class="rounded-2xl">
        </figure>
        <p class="text-[rgba(18,19,45,0.6)] lg:mt-[2.5rem] mt-5">
            <span><i class="fa-regular fa-calendar-days"></i></span> ${item.author.posted_date ? item.author.posted_date : 'No publish date'}
        </p>
        <p class="text-lg font-extrabold mt-4 text-[rgb(18,19,45)]">
            ${item.title}
        </p>
        <p class="text-[rgba(18,19,45,0.6)] mt-3">
            ${item.description} 
        </p>
        <div class="mt-4 flex gap-5">
            <figure class="w-11 h-11 rounded-full">
                <img src="${item.profile_image}" alt="" class="rounded-full">
            </figure>
            <div>
                <p class="font-bold text-[rgb(18,19,45)]">
                    ${item.author.name}
                </p>
                <p class="text-[rgba(18,19,45,0.6)]">
                    ${item.author.designation ? item.author.designation : 'Unknown'}
                </p>
            </div>
        </div>
    </div>
        `
        latestPostCards.appendChild(div);
    })
}

latestPost();