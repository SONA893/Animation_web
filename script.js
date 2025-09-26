    // small utilities: reveal on scroll
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting) e.target.classList.add('show');
      });
    },{threshold:0.12});
    revealEls.forEach(el=>io.observe(el));

    // typing effect (simple): cycles words
    const words = ['animate.', 'delight.', 'scale.'];
    const out = document.getElementById('typed');
    let wI=0, ch=0, forward=true;
    function tick(){
      const word = words[wI];
      if(forward){
        ch++;
        out.textContent = word.slice(0,ch);
        if(ch===word.length){forward=false;setTimeout(tick,900);return}
      } else {
        ch--;
        out.textContent = word.slice(0,ch);
        if(ch===0){forward=true;wI=(wI+1)%words.length}
      }
      setTimeout(tick,120);
    }
    tick();

    // smooth nav scrolling
    document.querySelectorAll('nav a').forEach(a=>{
      a.addEventListener('click',e=>{
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'});
      })
    })

    // contact form handler (demo only)
    function handleSubmit(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      if(!name||!email||!subject||!message){alert('Please complete all fields');return}
      // show micro-interaction
      const btn = e.target.querySelector('button');
      const prev = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(()=>{
        btn.textContent = 'Sent ✓';
        btn.disabled = false;
        setTimeout(()=>{btn.textContent = prev},2000);
        e.target.reset();
      },1200);
      return false;
    }

    // set year
    document.getElementById('year').textContent = new Date().getFullYear();

    // little parallax on mouse for hero card
    const heroRight = document.querySelector('.hero-right .card');
    document.querySelector('.hero').addEventListener('mousemove', (ev)=>{
      const rect = ev.currentTarget.getBoundingClientRect();
      const x = (ev.clientX - rect.left - rect.width/2)/rect.width;
      const y = (ev.clientY - rect.top - rect.height/2)/rect.height;
      heroRight.style.transform = `translateX(${x*12}px) translateY(${y*12}px) rotate(${x*3}deg)`;
    });
    document.querySelector('.hero').addEventListener('mouseleave', ()=>{heroRight.style.transform='none'});

    // dark mode toggle
    const toggle = document.getElementById('dark-mode-toggle');
    toggle.addEventListener('click', ()=>{
        document.body.classList.toggle('dark');
        toggle.classList.toggle('active');
    }
    );
  