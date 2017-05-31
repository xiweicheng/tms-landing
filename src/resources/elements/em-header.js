import { bindable, containerless } from 'aurelia-framework';

@containerless
export class EmHeader {

    user = null;

    bind() {
        $.get('/admin/user/loginUser', (data) => {
            if (data.success) {
                this.user = data.data;
            }
        }).always(() => {
            // this.user = { name: '张三' };
        });
    }

    logoutHandler() {
        $.post('/admin/logout').always(() => {
            this.user = null;
            // window.location.href = `/`;
        });
    }
}
