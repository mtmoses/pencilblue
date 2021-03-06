/*
    Copyright (C) 2016  PencilBlue, LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
'use strict';

module.exports = function LoginViewControllerModule(pb) {

    //pb dependencies
    var util           = pb.util;
    var ViewController = pb.ViewController;

    /**
     * Interface for logging in
     * @class LoginViewController
     * @constructor
     * @extends ViewController
     */
    function LoginViewController(){}
    util.inherits(LoginViewController, ViewController);

    LoginViewController.prototype.login = function(cb) {
        if(pb.security.isAuthenticated(this.session)) {
            return this.redirect('/', cb);
        }

        this.setPageName(this.ls.g('generic.LOGIN'));
        this.render('user/login', cb);
    };

    //exports
    return LoginViewController;
};
