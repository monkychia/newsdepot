$(document).ready(function() {
    let path = window.location.pathname;
    if (path === "/saved"){
        $.getJSON("/articles/saved", function(data) {
            data.forEach(savedArticle => {
                $("#displaySavedArticles").append(
                  `<div class="panel panel-info">
                    <div class="panel-heading data-id=${savedArticle._id} class="article">
                      <table>
                        <tr class="table-row">
                          <td class="col col-md-8 col-sm-12 col-xs-12"><h3>${savedArticle.title}</h3></td>
                          <td class="col col-md-2 col-sm-12 col-xs-12">
                            <button class="btn btn-default" data-id=${savedArticle._id} id="delete">DELETE FROM SAVED</button>
                          </td> 
                          <td class="col col-md-2 col-sm-12 col-xs-12">
                            <button class="btn btn-default" data-id=${savedArticle._id} id="note">ARTICLE NOTES</button>
                          </td> 
                        </tr>
                      </table>
                    </div>
                    <div class="panel-body">
                      <a href=${savedArticle.link}>${savedArticle.link}</a>
                    </div>
                  </div>`
                );
            })
        })

        // When "Article Notes" button is clicked
        $(document).on("click", "#note", function() {
            $("#notes").empty();
            let thisId = $(this).attr("data-id");

            $.get(`/articles/${thisId}`, function(data) {
            $("#notes").append
                (`<h2>${data.title}</h2>
                <input id="titleinput" name="title" placeholder="Notes Title">
                <textarea id='bodyinput' name='body' placeholder="Notes Body"></textarea>
                <button class="btn btn-primary" data-id=${data._id} id='savenote'>Save Note</button>`);

                if (data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
                };
            });
        });

    }
  });