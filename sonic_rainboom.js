function sonic_rainboom(image_path, by_char) {
  $('head').append('<style type="text/css">\
    .sr_0{color:#f00} .sr_1{color:#ff7f00} .sr_2{color:#ff0} .sr_3{color:#0f0} .sr_4{color:#0ff} .sr_5{color:#00f}\
    #sr_backdrop{position: fixed; top: 0; left: 0; background: #96dff0; width: 100%}\
    #sr_backdrop img{width: 100%}\
    </style>');
  $('body').append('<div id="sr_backdrop"><img src="'+(image_path || 'https://raw.github.com/joelcogen/sonic-rainboom-js/master/rainbow-dash.gif')+'"></div>');
  $('#sr_backdrop').height($(window).height());
  setTimeout(function(){ $('#sr_backdrop').remove() }, 1200);
  _sr_sonic_rec($('body'), by_char);
}

function _sr_sonic_rec(el, by_char) {
  save = el.clone();
  el.empty();
  save.contents().each(function(i, data){
    if(data instanceof Text){
      if(by_char)
        el.append(_sr_sonic_char(data.data));
      else
        el.append(_sr_sonic_word(data.data));
    }else{
      el.append(_sr_sonic_rec($(data), by_char));
    }
  });
  return el;
}

sr_current_color = 0;

function _sr_sonic_char(text){
  formatted_text = '';
  for(i=0; i<text.length; i++){
    char = text.charAt(i);
    if(/\s/.test(char)){
      formatted_text += char;
    }else{
      formatted_text += '<span class="sr_'+sr_current_color+'">'+char+'</span>';
      sr_current_color = (sr_current_color + 1) % 6
    }
  }
  return formatted_text;
}

function _sr_sonic_word(text){
  formatted_text = '';
  $(text.split(' ')).each(function(i, word){
    if(/^\s*$/.test(word)){
      formatted_text += word + ' ';
    }else{
      formatted_text += '<span class="sr_'+sr_current_color+'">'+word+'</span> ';
      sr_current_color = (sr_current_color + 1) % 6;
    }
  });
  return formatted_text.substring(0, formatted_text.length-1);
}
