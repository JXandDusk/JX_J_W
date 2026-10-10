
(() => {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let width=0,height=0,stars=[],frame=0,last=0,scroll=window.scrollY;
  let seed=83;
  const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
  function resize(){
    width=innerWidth;height=innerHeight;
    const dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    seed=83;
    stars=Array.from({length:Math.min(420,Math.round(width*height/2800))},()=>({
      x:random()*width,y:random()*height,r:.4+random()*1.5,phase:random()*Math.PI*2,
      speed:.4+random()*.9,depth:.05+random()*.19,color:['#dcefff','#83e5f2','#ffe0b3','#f5b8d0'][Math.floor(random()*4)]
    }));
    if(motion.matches||document.hidden) draw(0);
  }
  function draw(time){
    ctx.clearRect(0,0,width,height);
    const offset=motion.matches?0:scroll;
    for(const s of stars){
      const y=((s.y-offset*s.depth)%height+height)%height;
      const pulse=motion.matches?.75:.55+.4*Math.sin(time*.001*s.speed+s.phase);
      ctx.globalAlpha=pulse;ctx.fillStyle=s.color;
      ctx.beginPath();ctx.arc(s.x,y,s.r,0,Math.PI*2);ctx.fill();
      if(s.r>1.65){ctx.globalAlpha=pulse*.25;ctx.beginPath();ctx.arc(s.x,y,s.r*3,0,Math.PI*2);ctx.fill();}
    }
    ctx.globalAlpha=1;
    // Rare, soft meteor trails cross the background.
    if(!motion.matches){
      const cycle=(time%15000)/15000;
      if(cycle<.08){
        const p=cycle/.08,x=width*.8-p*width*.36,y=height*.12+p*height*.25;
        const gradient=ctx.createLinearGradient(x,y,x+100,y-55);
        gradient.addColorStop(0,'#bdfaff');gradient.addColorStop(1,'#bdfaff00');
        ctx.strokeStyle=gradient;ctx.lineWidth=1.5;ctx.globalAlpha=Math.sin(p*Math.PI);
        ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+100,y-55);ctx.stroke();ctx.globalAlpha=1;
      }
    }
  }
  function tick(time){frame=0;if(document.hidden||motion.matches)return;if(time-last>32){draw(time);last=time;}frame=requestAnimationFrame(tick);}
  function start(){cancelAnimationFrame(frame);frame=0;if(motion.matches||document.hidden)draw(0);else frame=requestAnimationFrame(tick);}
  addEventListener('resize',resize,{passive:true});
  addEventListener('scroll',()=>{scroll=window.scrollY;},{passive:true});
  document.addEventListener('visibilitychange',start);motion.addEventListener('change',start);
  resize();start();
})();
