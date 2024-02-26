const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 180;

//const currentFrame = (index) => `./best-ball4/${(index + 1).toString()}.jpg`;
const currentFrame = (index) => {
  let paddedIndex;
  if (index < 9) {
      // For indices 0-8 (leading to filenames 0001-0009)
      paddedIndex = `000${index + 1}`;
  } else if (index < 99) {
      // For indices 9-98 (leading to filenames 0010-0099)
      paddedIndex = `00${index + 1}`;
  } else {
      // For indices 99 and above (leading to filenames 0100, 0101, ...)
      paddedIndex = `0${index + 1}`;
  }
  return `./car/${paddedIndex}.png`;
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
  ".ball-text",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: 1,

      start: "50%",
      end: "60%",
    },
    onComplete: () => {
      gsap.to(".ball-text", { opacity: 0 });
    },
  }
);

images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[portfolio.frame], 0, 0);
}
