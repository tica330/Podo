window.addEventListener('load', () => {

    // 드롭다운 메뉴
    const nav=document.querySelector('#nav');
    const mn=document.querySelector('.nav_mn');

    mn.addEventListener('mouseover',()=>{
        nav.style.height='320px';
    });
    mn.addEventListener('mouseout',()=>{
        nav.style.height='100px';
    });


    // 슬라이드
    const slide=document.querySelector('.sl_img');
    const gall=document.getElementsByClassName('sl_img')[0];
    const btn=document.querySelectorAll('.sl_button li');
    const prev=document.querySelector('.prev');
    const next=document.querySelector('.next');
    let moveSlide=0;

    showSlide();

    function showSlide(){ 
        for(let b=0; b<btn.length; b++){
            let n=0;
            btn[b].index=b;

            //페이저
            btn[b].addEventListener('click',(e)=>{
                e.preventDefault();
                n=e.currentTarget.index;
                targetX=n*-100;
                slide.style.left=targetX+'%';
            
                for(let s=0; s<btn.length; s++){
                    if(s==n){
                        btn[s].classList.add('on');
                    }else{
                        btn[s].classList.remove('on');
                    };
                };
            });
        };

         //이전버튼
        prev.addEventListener('click',()=>{
            const lastGall=gall.lastElementChild;
	        const firstGall=gall.firstElementChild;
	        const newnode=lastGall.cloneNode(true);
	        gall.removeChild(lastGall);
	        gall.insertBefore(newnode,firstGall);
        });
        //다음버튼
        next.addEventListener('click',()=>{
            const firstGall=gall.firstElementChild;
	    	const newnode=firstGall.cloneNode(true);
	    	gall.removeChild(firstGall);
	    	gall.appendChild(newnode);
        });
    };
    
    //auto 슬라이드
    setInterval(()=>{
        moveSlide++;
        if(moveSlide===slide.childElementCount){
            moveSlide=0;
        }
        slide.style.setProperty('left','-'+moveSlide+'00%');
    },3000);


});