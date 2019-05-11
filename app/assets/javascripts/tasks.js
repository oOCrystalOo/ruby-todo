$(function() {
    function toggle_task () {
        var item_id = $(this).attr('data-id');
        var _done = $(this).prop('checked');
        $.post(`/tasks/${item_id}`, {
            _method: "PUT",
            task: {
                done: _done
            }
        }).success(function(data){
            if (_done) {
                $(`li[data-item_id="${data.id}"]`).addClass('completed');
            } else {
                $(`li[data-item_id="${data.id}"]`).removeClass('completed');
            }
        });
    }
    function create_list_item (task) {
        var done = task.done;
        var input = $('<input />').attr({
            type: 'checkbox',
            class: 'toggle',
            'data-id': task.id
        }).prop('checked', done).on('change', toggle_task);
        var label = $('<label></label>').html(task.title);
        var div = $('<div></div>').addClass('view').append(input, label);
        var li = $('<li></li>').attr('data-item_id', task.id).append(div).on('click', function(){
            $('input', this).trigger('click');
        });
        if (done) {
            li.addClass('completed');
        }
        $('ul.todo-list').append(li);
    }

    $.get("/tasks").success( function( data ) {
        $.each(data, function(index, task){
            create_list_item(task);
        });
    });

    $('form').on('submit', function(e){
        e.preventDefault();
        var input = $('input', this);
        var payload = {
            task: {
                title: input.val()
            }
        }
        $.post("/tasks", payload).success(function(data){
            create_list_item(data);
            input.val('');
        });
    });
});