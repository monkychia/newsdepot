$(document).ready(function() {


  // const displayArticles = (data) => 
  //   data.forEach(article => 
  //     $("#articles").append(`<p data-id=${article._id} class="article">${article.title}<br />${article.link}</p>`));
  
  // scrapeNewArticles();

  //});

  $(document).on('click', '.scrape', function() {

    console.log('--- 13 scrape');
    $.get("/scrape", function(req, res) {
      console.log(res);
    });

    // scrapeNewArticles();
    // $.getJSON("/articles", function(data) {
    //   data.forEach(article => {
    //     $("#articles").append(`<p data-id=${article._id} class="article">${article.title}<br />${article.link}</p>`);
    //   })
    // });  
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