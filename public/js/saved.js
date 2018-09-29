$(document).ready(function() {
    let path = window.location.pathname;

    console.log('-------- path ',path);

    if (path === "/saved"){
      $.getJSON("/articles/saved", function(data) {
        data.forEach((savedArticle) => {
            $("#displaySavedArticles").append(
                `<p data-id=${savedArticle._id} class="article">${savedArticle.title}<br />${savedArticle.link}</p>
                <button data-id=${savedArticle._id} id="delete">DELETE FROM SAVED</button>
                <button data-id=${savedArticle._id} id="delete">ARTICLE NOTES</button>`
            );
        })
      })
    }
  });