$(document).ready(function() {

  $(document).on('click', '.scrape', function() {
    $.getJSON("/scrape", function(data) {
      data.forEach(article => {
        $("#articles").append(
          `<p data-id=${article._id} class="article">${article.title}<br />${article.link}</p>
          <button data-id=${article._id} id="delete">Save Article</button>`);
      })
    });
  });

  // Listener to mark the article as saved
  $(document).on('click', '#saveArticle', function() {
    let thisId = $(this).attr("data-id");
    let toggle = true;
    $.ajax({
      url: `/article/${thisId}/${toggle}`,
      type: 'PUT',
      data: {},
      success: function(data) {
          console.log('-------- 21 data ', data);
      }
    });

  });

  $(document).on("click", ".saved", function() {
    window.location.replace("/saved");
  });

  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
    $("#notes").empty();
    let thisId = $(this).attr("data-id");

    $.get(`/articles/${thisId}`, function(data) {
      $("#notes").append
        (`<h2>${data.title}</h2>
          <input id="titleinput" name="title">
          <textarea id='bodyinput' name='body'></textarea>
          <button data-id=${data._id} id='savenote'>Save Note</button>`);

        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        };
    });
  });

  $(document).on("click", "#savenote", function() {
    let thisId = $(this).attr("data-id");
    let payload = {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }

    $.post(`/articles/${thisId}`, payload)
      .then(function(res) {
        // console.log('----------- 46 ',res);
        $("#notes").empty();
      });

    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  $(document).on('click', '.clear', function() {
    $.ajax({
      type: "DELETE",
      url: "/articles",
      success: function(data) {
        console.log(data);
        $(".article").remove();
      },
      error: function(data) {
        console.log('Error:', data);
      }
    
    });
  });
});

scrapeNewArticles = () => {
  // Grab the articles as a json
  $.getJSON("/scrape", (data) => {}
  // data.forEach(article => 
  //   $("#articles").append(`<p data-id=${article._id} class="article">${article.title}<br />${article.link}</p>`)));
);
}