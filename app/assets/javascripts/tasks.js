$(function() {
    function toggle_task () {
        var item_id = $(this).attr('data-id');
        var _done = $(this).prop('checked');
        $.post(`/tasks/${item_id}`, {
            _method: "PUT",
            task: {
            done: _done
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
        var li = $('<li></li>').append(div);
        $('ul.todo-list').append(li);
    }

    $.get("/tasks").success( function( data ) {
        $.each(data, function(index, task){
            create_list_item(task);
        });
    });

    $('form').on('submit', function(e){
        e.preventDefault();
        var input_val = $('input', this).val();
        var payload = {
            task: {
                title: input_val
            }
        }
        $.post("/tasks", payload).success(function(data){
            create_list_item(data);
            $('input', this).val('');
        });
    });
});