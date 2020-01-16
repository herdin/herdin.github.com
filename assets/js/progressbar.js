define(['progressbar'], (ProgressBar) => {

  let drawLine = (containerId) => {
    return new ProgressBar.Line(document.getElementById(containerId), {
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1400,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: {width: '100%', height: '100%'},
      text: {
        style: {
          // Text color.
          // Default: same as stroke color (options.color)
          color: '#999',
          position: 'absolute',
          right: '0',
          top: '30px',
          padding: 0,
          margin: 0,
          transform: null
        },
        autoStyleContainer: false
      },
      from: {color: '#FFEA82'},
      to: {color: '#ED6A5A'},
      step: (state, bar) => {
        bar.setText(Math.round(bar.value() * 100) + ' %');
      }
    });
  };
  let drawCircle = (containerId) => {
    return new ProgressBar.Circle(document.getElementById(containerId), {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 1400,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      svgStyle: null
    });
  };
  let drawCircleBounce = (containerId) => {
    return new ProgressBar.Circle(document.getElementById(containerId), {
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 1,
      duration: 1400,
      easing: 'bounce',
      strokeWidth: 6,
      from: {color: '#FFEA82', a:0},
      to: {color: '#ED6A5A', a:1},
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
      }
    });
  };
  let drawCircleMultiProp = (containerId) => {
    return new ProgressBar.Circle(document.getElementById(containerId), {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: false
      },
      from: { color: '#aaa', width: 1 },
      to: { color: '#333', width: 4 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value);
        }
      }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
  };
  return {
    draw : (containerId, type) => {
      if(type == 'line') { return drawLine(); }
      else if(type == 'circle') { return drawCircle(); }
      else if(type == 'circleb') { return drawCircleBounce(); }
      else if(type == 'circlemp') { return drawCircleMultiProp(); }
      else { throw new Error('IllegalArgumentError, containerId[' + containerId + '] type[' + type + ']'); }
    },
    animate : (bar, ratio, millisec) => {
      bar.animate(ratio, {duration:millisec});
    },
  };//end of return
});
