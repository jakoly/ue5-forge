        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('input[type="checkbox"][data-group]').forEach(function (cb) {
                cb.addEventListener('change', function () {
                    if (this.checked) {
                        var group = this.getAttribute('data-group');
                        document.querySelectorAll('input[type="checkbox"][data-group="' + group + '"]').forEach(function (other) {
                            if (other !== cb) other.checked = false;
                        });
                    }
                });
            });
        });