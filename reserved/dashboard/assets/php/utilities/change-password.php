					<html>
						<body>
							<div class="col-lg-12">
								<div class="card">
                                    <div class="card-header">Cambio Password </div><br>
                                    <div class="card-body card-block">
                                        <form action="" method="post" class="">
											<div class="form-group">
                                                <div class="input-group">
                                                    <div class="input-group-addon"> Codice </div>
                                                    <input type="text" id="codice" name="codice" class="form-control">
                                                    <div class="input-group-addon">
                                                        <i class="fas fa-key"></i>
                                                    </div>
                                                </div><br>
												<div class="card-footer">
													<button type="button" class="btn btn-info" id="inviacodice">
														Invia codice
													</button>
												</div>
                                            </div><br>
                                            <div class="form-group">
                                                <div class="input-group">
                                                    <div class="input-group-addon"> Nuova Password </div>
                                                    <input type="password" id="nuovaPassword" name="password" class="form-control">
                                                    <div class="input-group-addon">
                                                        <i class="fa fa-asterisk"></i>
                                                    </div>
                                                </div><br>
												<div class="input-group">
                                                    <div class="input-group-addon"> Conferma Password </div>
                                                    <input type="password" id="confermaPassword" name="confermaPassword" class="form-control">
                                                    <div class="input-group-addon">
                                                        <i class="fa fa-asterisk"></i>
                                                    </div>
                                                </div>
                                            </div><br>
										<div class="card-footer">
											<button type="submit" class="btn btn-success btn-sm " id="bottone">
												<i class="fas fa-check"></i> Conferma
											</button>
											<button type="reset" class="btn btn-danger btn-sm">
												<i class="fa fa-ban"></i> Reset
											</button>
											<span id="span"> </span>
										</div>
                                        </form>
                                    </div>
                                </div>
                            </div>
							
							<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
							<script src="../../js/change-password.js"></script>
							
						</body>
					</html>
					
<?php

echo json_encode($_POST);

?>