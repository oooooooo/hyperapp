var fx = function(a) {
  return function(b) {
    return [a, b]
  }
}

var throttledEvent = function(name) {}

var rawEvent = function(name) {
  return fx(function(dispatch, action) {
    var listener = function(event) {
      dispatch(action, event)
    }
    addEventListener(name, listener)
    return function() {
      removeEventListener(name, listener)
    }
  })
}

// Mouse
export var onMouseEnter = rawEvent("mouseenter")
export var onMouseLeave = rawEvent("mouseleave")
export var onMouseMove = rawEvent("mousemove")
export var onMouseOut = rawEvent("mouseout")
export var onMouseOver = rawEvent("mouseover")
export var onMouseUp = rawEvent("mouseup")

// Keyboard
export var onKeyDown = rawEvent("keydown")
export var onKeyUp = rawEvent("keyup")

// Window
export var onFocus = rawEvent("focus")
export var onBlur = rawEvent("blur")

// AnimationFrame
export var onAnimationFrame = fx(function(dispatch, action) {
  var id = requestAnimationFrame(function frame(timestamp) {
    dispatch(action, timestamp)
    id = requestAnimationFrame(frame)
  })
  return function() {
    cancelAnimationFrame(id)
  }
})

// Other
export var eventKey = function(event) {
  return event.key
}
export var targetChecked = function(event) {
  return event.target.checked
}
export var targetValue = function(event) {
  return event.target.value
}

export var eventOptions = fx(function(dispatch, props) {
  if (props.preventDefault) props.event.preventDefault()
  if (props.stopPropagation) props.event.stopPropagation()
  if (props.action != undefined) dispatch(props.action)
})

export var preventDefault = function(action) {
  return function(state, event) {
    return [
      state,
      eventOptions({ preventDefault: true, action: action, event: event })
    ]
  }
}
export var stopPropagation = function(action) {
  return function(state, event) {
    return [
      state,
      eventOptions({ stopPropagation: true, action: action, event: event })
    ]
  }
}
