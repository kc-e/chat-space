$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="main_chat__message_list__menu" data-message-id=${message.id}>
          <div class="main_chat__message_list__menu__name">
            ${message.user_name}
          </div>
          <div class="main_chat__message_list__menu__datetime">
            ${message.created_at}
          </div>
        </div>
        <div class="main_chat__message_list__message" data-message-id=${message.id}>
          <p class="main_chat__message_list__message__content">
            ${message.content}
          </p>
          <img class="Message__image" src="${message.image}">
        </div>`
      return html;
    } else {
      let html =
        `<div class="main_chat__message_list__menu" data-message-id=${message.id}>
          <div class="main_chat__message_list__menu__name">
            ${message.user_name}
          </div>
          <div class="main_chat__message_list__menu__datetime">
            ${message.created_at}
          </div>
        </div>
        <div class="main_chat__message_list__message" data-message-id=${message.id}>
          <p class="main_chat__message_list__message__content">
            ${message.content}
          </p>
        </div>`
      return html;
    };
  }

  $('.main_chat__message_form__Form').on('submit', function(e){
    console.log(this)
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main_chat__message_list').append(html);      
      $('.main_chat__message_list').animate({ scrollTop: $('.main_chat__message_list')[0].scrollHeight});
      $('.main_chat__message_form__Form__send').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
});