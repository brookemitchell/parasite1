Template.lilBoxes.helpers({

  boxes: () => [1,2,3,4,5,6,7,8],

  seconds: function () {
    return counter.get()
  }
})

var counter = new ReactiveVar(0);

setInterval(function () {
  counter.set(counter.get() + 1)
}, 1000);
