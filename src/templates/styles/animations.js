const animations = [
  {
    name: "inAnimation",
    template: `@keyframes inAnimation {
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}`,
  },
  {
    name: "outAnimation",
    template: `@keyframes outAnimation {
  20% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}`,
  },
];

module.exports = animations;
