$(document).ready(function() {
  $.getJSON("/scrape", function(data) {

    console.log(data);

    data.forEach(article => {
      $("#articles").append(
        `<div class="panel panel-success" data-id=${article._id}>
          <div class="panel-heading data-id=${article._id} class="article">
            <table>
              <tr class="table-row">
                <td class="col col-md-8 col-sm-12 col-xs-12"><h4>${article.title}</h4></td>
                <td class="col col-md-4 col-sm-12 col-xs-12">
                  <button class="btn btn-default" data-id=${article._id} id="saveArticle">Save Article</button>
                </td> 
              </tr>
            </table>
          </div>
          <div class="panel-body">
            <a href=${article.link}>${article.link}</a>
          </div>
        </div>`
      );
    })
  });

  $(document).on('click', '.scrape', function() {
    $(".panel").remove();
    // want to look for only new ones and display
    $.getJSON("/scrape", function(data) {
      data.forEach(article => {
        $("#articles").append(
          `<div class="panel panel-success" data-id=${article._id}>
            <div class="panel-heading data-id=${article._id} class="article">
              <table>
                <tr class="table-row">
                  <td class="col col-md-8 col-sm-12 col-xs-12"><h4>${article.title}</h4></td>
                  <td class="col col-md-4 col-sm-12 col-xs-12">
                    <button class="btn btn-default" data-id=${article._id} id="saveArticle">Save Article</button>
                  </td> 
                </tr>
              </table>
            </div>
            <div class="panel-body">
              <a href=${article.link}>${article.link}</a>
            </div>
          </div>`
        );
      })
    });
  });

  $(document).on('click', '#delete', function() {
    let thisId = $(this).attr("data-id");
    let toggle = false;
    $.ajax({
      url: `/article/${thisId}/${toggle}`,
      type: 'PUT',
      data: {},
      success: function(data) {
        window.location.reload();
      }
    });
  })

  // Listener to mark the article as saved
  $(document).on('click', '#saveArticle', function() {
    let thisId = $(this).attr("data-id");
    let toggle = true;
    $.ajax({
      url: `/article/${thisId}/${toggle}`,
      type: 'PUT',
      data: {},
      success: function(data) {}
    });

    $(this).parent().parent().parent().parent().parent().parent().remove();
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
          <button class="btn btn-default" data-id=${data._id} id='savenote'>Save Note</button>`);

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
        $(".panel").remove();
        $("#displaySavedArticles").remove();
        $("#notes").remove();
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