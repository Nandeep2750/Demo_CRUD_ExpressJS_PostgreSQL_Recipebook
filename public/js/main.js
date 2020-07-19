$(document).ready(function () {
    $(".delete-recipie").on('click',function () {
        var id = $(this).data('id');
        console.log("id", id)
        var url = '/delete/'+id;
        console.log("url", url)
        if (confirm('Delete Recipe?')) {
            $.ajax({
                url : url,
                type: 'DELETE',
                success: function (result) {
                    console.log("Deleting Recipie...");
                    window.location.href = '/';
                },
                error:function (err) {
                    console.log("err", err)
                }
            })
        }
    });


    $(".edit-recipie").on('click',function () { 
        var id = $(this).data('id');
        var name = $(this).data('name');
        var ingredients = $(this).data('ingredients');
        var directions = $(this).data('directions');
        
        $('#edit-form-id').val(id);
        $('#edit-form-name').val(name);
        $('#edit-form-ingredients').val(ingredients);
        $('#edit-form-directions').val( directions);

    });

})