const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("DOMContentLoaded", function() {

  document.body.style.overflowX = 'hidden';

  var element = document.getElementById('yourElementId');
  if (element) {
    element.style.overflowX = 'hidden';
  }
});

let isScrollingAllowed = true;
const maxScrollHeight = 5000; // Maximum scroll height in pixels where the custom behavior stops

document.addEventListener('wheel', function(event) {
  if (!isScrollingAllowed || window.scrollY >= maxScrollHeight) {
    if (window.scrollY >= maxScrollHeight) {
      // Once the max scroll height is reached, allow normal scrolling
      return;
    }
    event.preventDefault();
    return;
  }

  event.preventDefault(); // Prevent normal scroll behavior
  isScrollingAllowed = false; // Block new scrolls
  
  const scrollAmount = 48; // Define how much to scroll
  const scrollSpeed = 20; // Control the speed; lower is faster
  let alreadyScrolled = 0; // Track how much we've already scrolled

  // Function to perform the scroll
  function scrollPage() {
    if (alreadyScrolled < scrollAmount && window.scrollY < maxScrollHeight) {
      window.scrollBy(0, scrollAmount);
      alreadyScrolled++;
      setTimeout(scrollPage, scrollSpeed);
    } else {
      // Re-enable scrolling after a delay, but only if below max height
      setTimeout(() => {
        if (window.scrollY < maxScrollHeight) {
          isScrollingAllowed = true;
        }
      }, 500); // 0.5 second delay before allowing another scroll
    }
  }

  // Start the scrolling process
  scrollPage();
}, { passive: false });

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
       
        setTimeout(pauseScroll, 500);
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
        setTimeout(pauseScroll, 500);
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

/*window.addEventListener('load', function() {
  document.getElementById('loading-screen').style.display = 'none';
});*/

function pauseScroll() {
  // Disable scrolling
  document.body.style.overflow = 'hidden';
  
  // Enable scrolling after 1 second
  setTimeout(() => {
    document.body.style.overflow = '';
  }, 1000);
}

