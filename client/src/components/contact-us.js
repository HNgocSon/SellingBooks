export default function ContactUs(){
    return(<>
    <main id="tg-main" class="tg-main tg-haslayout">
			<div class="tg-sectionspace tg-haslayout">
				<div class="container">
					<div class="row">
						<div class="tg-contactus">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<div class="tg-sectionhead">
									<h2><span>Say Hello!</span>Get In Touch With Us</h2>
								</div>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
								<div id="tg-locationmap" class="tg-locationmap tg-map"></div>
							</div>
							<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
								<form class="tg-formtheme tg-formcontactus">
									<fieldset>
										<div class="form-group">
											<input type="text" name="first-name" class="form-control" placeholder="First Name*"/>
										</div>
										<div class="form-group">
											<input type="text" name="last-name" class="form-control" placeholder="Last Name*"/>
										</div>
										<div class="form-group">
											<input type="email" name="email" class="form-control" placeholder="Last Name*"/>
										</div>
										<div class="form-group">
											<input type="text" name="subject" class="form-control" placeholder="Subject (optional)"/>
										</div>
										<div class="form-group tg-hastextarea">
											<textarea placeholder="Comment"></textarea>
										</div>
										<div class="form-group">
											<button type="submit" class="tg-btn tg-active">Gửi</button>
										</div>
									</fieldset>
								</form>
								<div class="tg-contactdetail">
									<div class="tg-sectionhead">
										<h2>Liên hệ với chúng tôi</h2>
									</div>
									<ul class="tg-contactinfo">
										<li>
											<i class="icon-apartment"></i>
											<address>summoner rift</address>
										</li>
										<li>
											<i class="icon-phone-handset"></i>
											<span>
												<em>0123 - 456 - 789</em>
												<em>0987 - 654 - 321</em>
											</span>
										</li>
										<li>
											<i class="icon-clock"></i>
											<span>Full time</span>
										</li>
										<li>
											<i class="icon-envelope"></i>
											<span>
												<em><a href="">support@domain.com</a></em>
												<em><a href="">info@domain.com</a></em>
											</span>
										</li>
									</ul>
									<ul class="tg-socialicons">
										<li class="tg-facebook"><a href=""><i class="fa fa-facebook"></i></a></li>
										<li class="tg-twitter"><a href=""><i class="fa fa-twitter"></i></a></li>
										<li class="tg-linkedin"><a href=""><i class="fa fa-linkedin"></i></a></li>
										<li class="tg-googleplus"><a href=""><i class="fa fa-google-plus"></i></a></li>
										<li class="tg-rss"><a href=""><i class="fa fa-rss"></i></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
    </>)
}