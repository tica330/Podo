window.addEventListener('load', () => {

    // 드롭다운 메뉴
    const nav = document.querySelector('#nav');
    const mn = document.querySelector('.nav_mn');

    mn.addEventListener('mouseover', () => {
        nav.style.height = '240px';
    });
    mn.addEventListener('mouseout', () => {
        nav.style.height = '70px';
    });

    // 슬라이드
    const slide = document.querySelector(".slide");
    let slideWidth = slide.clientWidth;
    const prevBtn = document.querySelector(".slide_prev_button");
    const nextBtn = document.querySelector(".slide_next_button");
    let slideItems = document.querySelectorAll(".slide_item");
    const maxSlide = slideItems.length;
    const pagination = document.querySelector(".slide_pagination");
    let currSlide = 1;

    //페이지네이션 생성
    for (let i = 0; i < maxSlide; i++) {
        if (i === 0) 
            pagination.innerHTML += `<li class="active"><img src="images/slide_button.png" alt=""></li>`;
        else 
            pagination.innerHTML += `<li><img src="images/slide_button.png" alt=""></li>`;
        }
    
    const paginationItems = document.querySelectorAll(".slide_pagination > li");

    // 무한 슬라이드 start, end 복사
    const startSlide = slideItems[0];
    const endSlide = slideItems[slideItems.length - 1];
    const startElem = document.createElement("div");
    const endElem = document.createElement("div");

    endSlide.classList.forEach((c) => endElem.classList.add(c));
    endElem.innerHTML = endSlide.innerHTML;

    startSlide.classList.forEach((c) => startElem.classList.add(c));
    startElem.innerHTML = startSlide.innerHTML;

    slideItems[0].before(endElem);
    slideItems[slideItems.length - 1].after(startElem);

    // 슬라이드 값을 변경해주기 위해 전체 선택
    slideItems = document.querySelectorAll(".slide_item");
    let offset = slideWidth + currSlide;
    slideItems.forEach((i) => {
        i.setAttribute("style", `left: ${ - offset}px`);
    });

    function nextMove() {
        currSlide++;
        if (currSlide <= maxSlide) {
            const offset = slideWidth * currSlide;
            slideItems.forEach((i) => {
                i.setAttribute("style", `left: ${ - offset}px`);
            });
            paginationItems.forEach((i) => i.classList.remove("active"));
            paginationItems[currSlide - 1].classList.add("active");
        } else {
            currSlide = 0;
            let offset = slideWidth * currSlide;
            slideItems.forEach((i) => {
                i.setAttribute("style", `transition: ${0}s; left: ${ - offset}px`);
            });
            currSlide++;
            offset = slideWidth * currSlide;
            setTimeout(() => {
                slideItems.forEach((i) => {
                    i.setAttribute("style", `transition: ${ 0.5}s; left: ${ - offset}px`);
                });
            }, 0);
            paginationItems.forEach((i) => i.classList.remove("active"));
            paginationItems[currSlide - 1].classList.add("active");
        }
    }

    function prevMove() {
        currSlide--;
        if (currSlide > 0) {
            const offset = slideWidth * currSlide;
            slideItems.forEach((i) => {
                i.setAttribute("style", `left: ${ - offset}px`);
            });
            paginationItems.forEach((i) => i.classList.remove("active"));
            paginationItems[currSlide - 1].classList.add("active");
        } else {
            currSlide = maxSlide + 1;
            let offset = slideWidth * currSlide;
            slideItems.forEach((i) => {
                i.setAttribute("style", `transition: ${0}s; left: ${ - offset}px`);
            });
            currSlide--;
            offset = slideWidth * currSlide;
            setTimeout(() => {
                slideItems.forEach((i) => {
                    i.setAttribute("style", `transition: ${ 0.5}s; left: ${ - offset}px`);
                });
            }, 0);
            paginationItems.forEach((i) => i.classList.remove("active"));
            paginationItems[currSlide - 1].classList.add("active");
        }
    }

    nextBtn.addEventListener("click", () => {
        nextMove();
    });
    prevBtn.addEventListener("click", () => {
        prevMove();
    });

    // 브라우저 화면사이즈 반응
    window.addEventListener("resize", () => {
        slideWidth = slide.clientWidth;
    });

    //클릭시 해당 슬라이드 이동
    for (let i = 0; i < maxSlide; i++) {
        paginationItems[i].addEventListener("click", () => {
            currSlide = i + 1;
            const offset = slideWidth * currSlide;
            slideItems.forEach((i) => {
                i.setAttribute("style", `left: ${ - offset}px`);
            });
            paginationItems.forEach((i) => i.classList.remove("active"));
            paginationItems[currSlide - 1].classList.add("active");
        });
    }

    // 슬라이드 루프
    let loopInterval = setInterval(() => {
        nextMove();
    }, 3000);
    
    loopInterval();

});
