<!-- MENU SIDEBAR-->
<aside class="menu-sidebar2">
            <div class="logo">
                <a href="#">
                    <img src="assets/images/icon/logo-white.png" alt="Cool Admin" />
                </a>
            </div>
            <div class="menu-sidebar2__content js-scrollbar1">
                <div class="account2">
                    <div class="image img-cir img-120">
                        <img src="assets/images/users/base.png" alt="Immagine profilo" id="user_img" />
                    </div>
                    <h4 class="name" id="user_name">N / D</h4>
                    <a href="assets/php/utilities/sign_out.php">Sign out</a>
                </div>
                <nav class="navbar-sidebar2">
                    <ul class="list-unstyled navbar__list">
                        <li class="active has-sub">
                            <a class="js-arrow" href="#">
                                <i class="fas fa-eye"></i>Visualizza
                                <span class="arrow">
                                    <i class="fas fa-angle-down"></i>
                                </span>
                            </a>
                            <ul class="list-unstyled navbar__sub-list js-sub-list">
                                <li>
                                    <button id="btn_show_ticket" style="/*display: none;*/">
                                        <i class="fas fa-ticket-alt"></i>Ticket</button>
                                </li>
                                <li>
                                    <button id="btn_show_account">
                                        <i class="fas fa-unlock-alt"></i>Account</button>
                                </li>
                                <!--<li>
                                    <a href="index3.html">
                                        <i class="fas fa-tachometer-alt"></i>Dashboard 3</a>
                                </li>-->
                                <!--<li>
                                    <a href="index4.html">
                                        <i class="fas fa-tachometer-alt"></i>Dashboard 4</a>
                                </li>-->
                            </ul>
                        </li>
                        <!--<li>
                            <a href="inbox.html">
                                <i class="fas fa-chart-bar"></i>Inbox</a>
                            <span class="inbox-num">3</span>
                        </li>-->
                        <!--<li>
                            <a href="#">
                                <i class="fas fa-shopping-basket"></i>eCommerce</a>
                        </li>-->
                        <li class="has-sub" id="menu_gestione" style="display: none;">
                            <a class="js-arrow" href="#">
                                <i class="fas fa-tasks"></i>Gestione
                                <span class="arrow">
                                    <i class="fas fa-angle-down"></i>
                                </span>
                            </a>
                            <ul class="list-unstyled navbar__sub-list js-sub-list" id="menu_gestione">
                                <li>
                                    <button id="btn_show_ticket" style="display: none;">
                                        <i class="fas fa-ticket-alt"></i>Ticket</button>
                                </li>
                                <li>
                                    <button id="btn_show_user" style="display: none;">
                                        <i class="fas fa-users"></i>Utenti</button>
                                </li>
                                <li>
                                    <button id="btn_show_permessi" style="display: none;">
                                        <i class="fas fa-shield-alt"></i>Permessi</button>
                                </li>
                                <li>
                                    <button id="btn_show_macroaree" style="display: none;">
                                        <i class="fas fa-th-large"></i>Macroaree</button>
                                </li>
                                <li>
                                    <button id="btn_show_categorie" style="display: none;">
                                        <i class="fas fa-list-alt"></i>Categorie</button>
                                </li>
                                <li>
                                    <button id="btn_show_aule" style="display: none;">
                                        <i class="fas fa-graduation-cap"></i>Aule</button>
                                </li>
                                <li>
                                    <button id="btn_show_competenze" style="display: none;">
                                        <i class="fas fa-briefcase"></i>Competenze</button>
                                </li>
                                <li>
                                    <button id="btn_show_note" style="display: none;">
                                        <i class="fas fa-clipboard"></i>Annotazioni</button>
                                </li>
                            </ul>
                        </li>
                        <li class="has-sub">
                            <a class="js-arrow" href="#">
                                <i class="fas fa-copy"></i>Impostazioni account
                                <span class="arrow">
                                    <i class="fas fa-angle-down"></i>
                                </span>
                            </a>
                            <ul class="list-unstyled navbar__sub-list js-sub-list">
                                <li>
                                    <a id = "login" href="#">
                                        <i class="fas fa-sign-in-alt"></i>Accedi</a>
                                </li>
                                <li>
                                    <a id="signup" href="#">
                                        <i class="fas fa-user"></i>Registrati</a>
                                </li>
                                <li>
                                    <!--<a href="forget-pass.html">-->
                                        <button id="btn_change_password"><i class="fas fa-unlock-alt"></i> Cambia password</button><!--</a>-->
                                </li>
                            </ul>
                        </li>
                        <!--<li class="has-sub">
                            <a class="js-arrow" href="#">
                                <i class="fas fa-desktop"></i>UI Elements
                                <span class="arrow">
                                    <i class="fas fa-angle-down"></i>
                                </span>
                            </a>
                            <ul class="list-unstyled navbar__sub-list js-sub-list">
                                <li>
                                    <a href="button.html">
                                        <i class="fab fa-flickr"></i>Button</a>
                                </li>
                                <li>
                                    <a href="badge.html">
                                        <i class="fas fa-comment-alt"></i>Badges</a>
                                </li>
                                <li>
                                    <a href="tab.html">
                                        <i class="far fa-window-maximize"></i>Tabs</a>
                                </li>
                                <li>
                                    <a href="card.html">
                                        <i class="far fa-id-card"></i>Cards</a>
                                </li>
                                <li>
                                    <a href="alert.html">
                                        <i class="far fa-bell"></i>Alerts</a>
                                </li>
                                <li>
                                    <a href="progress-bar.html">
                                        <i class="fas fa-tasks"></i>Progress Bars</a>
                                </li>
                                <li>
                                    <a href="modal.html">
                                        <i class="far fa-window-restore"></i>Modals</a>
                                </li>
                                <li>
                                    <a href="switch.html">
                                        <i class="fas fa-toggle-on"></i>Switchs</a>
                                </li>
                                <li>
                                    <a href="grid.html">
                                        <i class="fas fa-th-large"></i>Grids</a>
                                </li>
                                <li>
                                    <a href="fontawesome.html">
                                        <i class="fab fa-font-awesome"></i>FontAwesome</a>
                                </li>
                                <li>
                                    <a href="typo.html">
                                        <i class="fas fa-font"></i>Typography</a>
                                </li>
                            </ul>
                        </li>-->
                    </ul>
                </nav>
            </div>
        </aside>
        <!-- END MENU SIDEBAR-->