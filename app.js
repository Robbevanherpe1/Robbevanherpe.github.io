const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 180;

const currentFrame = (index) => {
  const baseUrls = [
    "https://ik.imagekit.io/RVH/blender-render4/",
    "https://ik.imagekit.io/RVH/blender-gsm/"
  ];
  const urlIndex = window.innerWidth <= 768 ? 1 : 0; // Use car-test images for phone screens
  let paddedIndex;
  if (index < 9) {
      paddedIndex = `000${index + 1}`;
  } else if (index < 99) {
      paddedIndex = `00${index + 1}`;
  } else {
      paddedIndex = `0${index + 1}`;
  }
  return `${baseUrls[urlIndex]}${paddedIndex}.png`;
};

const images = [];
let portfolio = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  console.log(currentFrame(i));
  images.push(img);
}

gsap.to(portfolio, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    pin: "canvas",
    end: "500%",
  },
  onUpdate: render,
});



gsap.fromTo(
  ".scroll-info",
  {
    opacity: 20,
  },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: 1,

      start: "0%",
      end: "1%",
    },
    onComplete: () => {
      gsap.to(".scroll-info", { opacity: 0, });
    },
  }
);

gsap.fromTo(
  ".portfolio-title",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: 1,

      start: "0%",
      end: "10%",
    },
    onComplete: () => {
      gsap.to(".portfolio-title", { opacity: 0,});
    },
  }
);

gsap.fromTo(
  [".experience-head", ".experience-text", ".experience-skills"],
  { opacity: 0 },
  {
    opacity: 1,
    scrollTrigger: {
      start: "25%",
      end: "37%",
      toggleActions: "play none none reverse",
      onEnter: () => {
        gsap.set([".experience-head", ".experience-text", ".experience-skills"], { opacity: 1 });
       
        pauseScroll(); 
      },
      onLeave: () => {
        gsap.set([".experience-head", ".experience-text", ".experience-skills"], { opacity: 0 }); 
      }
    }
  }
);

gsap.fromTo(
  [".projects-head", ".projects-text",".projects-project"],
  { opacity: 0 },
  {
    opacity: 1,
    scrollTrigger: {
      start: "63%",
      end: "71%",
      toggleActions: "play none none reverse",
      //onLeaveBack: self => self.disable(),  // Disables the trigger when scrolled back past the start
      onEnter: () => {
        gsap.set([".projects-head", ".projects-text", ".projects-project"], { opacity: 1 }),
        pauseScroll(); 
      },
      onLeave: () => gsap.set([".projects-head", ".projects-text", ".projects-project"], { opacity: 0 })
    } 
  }
);


images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[portfolio.frame], 0, 0);
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.addEventListener('load', setTimeout(function() {
  
  document.getElementById('loading-screen').style.display = 'none';
}, 5000));


// Hide scrollbar but allow scroll
document.body.style.overflowY = 'scroll'; // Enable vertical scroll
document.body.style.scrollbarWidth = 'none'; // For Firefox
document.body.style.msOverflowStyle = 'none';  // For Internet Explorer and Edge

// For Chrome, Safari
document.body.style.overflow = 'overlay'; // This makes scrollbar overlay content, not taking space
document.querySelector('body::-webkit-scrollbar').style.display = 'none';

let allowScroll = true;
const scrollTimeoutDuration = 1000; // Adjust the timeout duration as needed

function pauseScroll() {
  setTimeout(() => { 
    if (allowScroll) {
      allowScroll = false; 
      
      setTimeout(() => {
        allowScroll = true;
      }, scrollTimeoutDuration);
    }
  }, 500); 
}

