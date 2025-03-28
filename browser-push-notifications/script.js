const button = document.querySelector("button");
button.addEventListener("click", () => {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      const notification = new Notification("Example notification", {
        body: `This is a random number ${Math.random() * 10}`,
        data: {
          hello: "world",
        },
        icon: "image.png",
        //* The below do not have good browser support
        // tag:'Welcome Message'
      });

      notification.addEventListener("");
    }
  });
});

let notification;
let interval;

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    const leaveDate = new Date();
    interval = setInterval(() => {
      notification = new Notification("Come back please", {
        body: `You have been gone for ${
          (new Date() - leaveDate) / 1000
        } seconds`,
        data: {
          hello: "world",
        },
        icon: "image.png",
        tag: "Come back",
      });
    }, 1000);
  } else {
    if (notification) notification.close();
    if (interval) clearInterval(interval);
  }
});

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = ""; //todo: `returnValue` seems to be deprecated, find out if there is an alternative
});
