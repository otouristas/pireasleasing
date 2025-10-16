

<!doctype html>
<html lang="" translate="no">
	<head>
        
		<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

				<title>GOCARS.online | Online Booking Engine</title>
					<meta name="description" content="Find the perfect vehicle with {SEOCompanyName}. Use our easy-to-navigate search engine to browse, compare, and book vehicles for your next trip. Fast, secure, and reliable!">
		
		
				<link rel="icon" type="image/png" href="https://antiparosrentacar.gocars.gr/online-admin/app/web/upload/favicon/c153de36a232121a98b9a5d3931ee55a.jpg"/>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

		<link rel="stylesheet" media="screen" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css" />
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

		
		
					<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css">
			<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet">

			<script src="https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js"></script>
		
		<script src="https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js"></script>
		
					<link rel="stylesheet" href="https://antiparosrentacar.gocars.gr/online-admin/third-party/jquery-toast/dist/jquery.toast.min.css?v=1760642127">
			<style>

.gcActionSearchForm .gc-form-wrapper, 
.gcFront.gcActionSearchForm #page-wrapper, 
.gcActionSearchForm .gc-container {
	max-width: unset;
    width: 100%;
    padding: 0; 
}

.gcActionSearchForm .gc-form-heading, 
.gcActionSearchForm .last_search-button {
	display: none;
}
.gcFront.gcActionSearchForm, 
.gcFront.gcActionSearchForm .site-content {
  background: transparent!important;
}
.gcFront.gcActionSearchForm .form-overlay.opened {
	opacity: 0;
}
</style>
<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/third-party/bootstrap/3.3.7/css/bootstrap.min.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/third-party/font_awesome/4.7.0/css/font-awesome.min.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/third-party/toastr/2.1.0/toastr.min.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/third-party/icheck/1.0.2/custom.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/third-party/gritter/1.7.4/jquery.gritter.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/third-party/sweetalert/1.0.0/sweetalert.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/third-party/touchspin/3.0.1/jquery.bootstrap-touchspin.min.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/plugins/pjBase/web/css/animate.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/plugins/pjBase/web/css/style.css?202510Thu191527?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/app/web/css/admin.css?202510161015?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/app/web/css/calendar_availability.css?202510161015?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/app/web/css/statistics.css?202510161015?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/app/web/css/bookings_calendar.css?202510161015?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/app/web/css/reminders.css?202510161015?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/app/web/css/reservations.css?202510161015?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/third-party/jasny/3.1.2/jasny-bootstrap.min.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/third-party/select2/4.0.3/css/select2.min.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/plugins/pjBase/web/css/style.css?202510Thu221527?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/plugins/pjBase/web/css/custom.css?v=1760642127">
	<link rel="stylesheet" type="text/css" href="https://antiparosrentacar.gocars.gr/online-admin/plugins/pjBase/web/css/themes/theme1.css?v=1760642127">

	</head>

	<body class="gocars-online-content back_office-wrap pjAdmin pjActionIndex ">

        <!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T4QXTDRM"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->        
		<div id="wrapper" class="go-cars-wrapper">
							
<nav class="menu-sidebar sidebar navbar-default">
    <div class="sidebar-collapse">
        <ul class="nav-menu">
            <li class="gocars-logo-wrap">
                <a href="https://gocars.online/" class="header-gocars-link" target="_blank">
                                                            <img class="gocars-logo-img full-image" src="https://antiparosrentacar.gocars.gr/online-admin//app/web/upload/gocars_logo/gocars-logo-white-cropped.png">
                    <img class="gocars-logo-img small-image" src="https://antiparosrentacar.gocars.gr/online-admin//app/web/upload/gocars_logo/gocars-logo-white-g.png">
                </a>
            </li>
            <li class="nav-header">
                                <!-- <a href="www.antiparosrentacar.com"  class="header-item-link" target="_blank"></a> -->
                <a class="header-item-link" target="_blank" href="https://antiparosrentacar.gocars.gr/">
                    <img class="image_logo" src="https://antiparosrentacar.gocars.gr/online-admin/app/web/upload/logo/030c1451a6681a778bd656273117afe2.png?v=1760642127">
                </a>
            </li>
			<script
  src="https://code.jquery.com/jquery-3.6.0.js"
  integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
  crossorigin="anonymous"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

		<li class="menu-title menu-active" data-list-label="general" id="menu_general">
             <span class="nav-label full-menu">General</span>
             <span class="nav-label toggle-menu" title="General"><i class="icon-dashboard-icon-solid"></i></span>
             <span class="fa arrow"></span>
		</li>
				    <li class="active" data-list='general'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdmin&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-dashboard-light" title="Dashboard"></i>
                        <span class="nav-label">Dashboard</span>
                    </div>
                </a>
		    </li>
		
				    <li data-list='general'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminStatistics&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-statistics-light" title="Statistics"></i>
                        <span class="nav-label">Statistics</span>
                    </div>
                </a>
		    </li>
		
									<li  data-list='general'>
					<a class="menu-link" href="/online-admin/index.php?controller=pjAdminBookingCalendar&amp;action=pjActionIndex">
						<div class="menu-item-title-wrap">
							<i class="icon-calendar-light" title="Calendar"></i>
							<span class="nav-label">Calendar</span>
						</div>
					</a>
				</li>
									    <li data-list='general'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminBookings&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-reservations-light" title="Reservations"></i>
                        <span class="nav-label">Reservations</span>
                    </div>
                    <span class="count-info">59</span>
                </a>
		    </li>
				
		
					<li data-list='general' style='display:none'>
				<a class="menu-link" href="/online-admin/index.php?controller=pjAdminRealBookings&amp;action=pjActionIndex">
					<div class="menu-item-title-wrap">
						<i class="icon-reservations-light" title="Reservations"></i>
						<span class="nav-label">*Reservations*</span>
					</div>
				</a>
			</li>
		
		<!--  -->
				    <li data-list='general'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminContracts&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-bulk-email-light" title="Contracts"></i>
                        <span class="nav-label">Contracts</span>
                    </div>
                </a>
		    </li>
		
				    <li data-list='general'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminAttempts&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-attempts" title="Attempts"></i>
                        <span class="nav-label">Attempts</span>
                    </div>
                </a>
		    </li>
		

		<li class="menu-title menu-active" data-list-label="fleet" id="menu_fleet">
             <span class="nav-label full-menu">Fleet</span>
             <span class="nav-label toggle-menu" title="Fleet"><i class="icon-fleet-solid"></i></span>
             <span class="fa arrow"></span>
	    </li>

		

				    <li data-list='fleet'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminGroups&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-groups-light" title="Groups"></i>
                        <span class="nav-label">Groups</span> 
                    </div>
                    <span class="count-info">5</span>
                </a>
		    </li>
		
				    <li data-list='fleet'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminTypes&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-types-and-rates-light" title="Types & Rates"></i>
                        <span class="nav-label"> Types & Rates</span>
                    </div>
                    <span class="count-info">32</span>
                </a>
		    </li>
		
				    <li data-list='fleet'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminModels&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-models-light" title="Models"></i>
                        <span class="nav-label">Models</span>
                    </div>
                    <span class="count-info">39</span>
                </a>
		    </li>
		
				    <li  data-list='fleet'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminVehicles&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-vehicles-light" title="Vehicles"></i>
                        <span class="nav-label">Vehicles</span>
                    </div>
                    <span class="count-info">120</span>
                </a>
		    </li>
		
						<li  data-list='fleet'>
									<a class="menu-link" href="/online-admin/index.php?controller=pjAdminFleetInfo&amp;action=pjActionVehicleInsurance">
						<div class="menu-item-title-wrap">
								<i class="icon-fleet-info-light" title="Fleet Info"></i>
								<span class="nav-label">Fleet Info</span>
						</div>
						<span class="count-info">120</span>
					</a>
				</li>
		

	<li class="menu-title menu-active" data-list-label="extras" id="menu_extras">
         <span class="nav-label full-menu">Extras</span>
         <span class="nav-label toggle-menu" title="Extras"><i class="icon-extras-solid"></i></span>
         <span class="fa arrow"></span>
	</li>

				    <li data-list='extras'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminExtras&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-extras-light" title="Extras"></i>
                        <span class="nav-label">Extras</span>
                    </div>
                    <span class="count-info">6</span>
                </a>
		    </li>
		
				    <li data-list='extras'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminInsurances&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-insurances-light" title="Insurances"></i>
                        <span class="nav-label">Insurances</span>
                    </div>
                    <span class="count-info">2</span>
                </a>
		    </li>
		
		
				    <li data-list='extras'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminLocations&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-locations-light" title="Locations"></i>
                        <span class="nav-label">Locations</span>
                    </div>
                    <span class="count-info">6</span>
                </a>
		    </li>
				


	<li class="menu-title menu-active" data-list-label="sales" id="menu_sales">
         <span class="nav-label full-menu">Sales</span>
         <span class="nav-label toggle-menu" title="Sales"><i class="icon-sales-solid"></i></span>
         <span class="fa arrow"></span>
	</li>

				    <li data-list='sales'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminDiscountsPertype&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-discounts-light" title="Discounts"></i>
                        <span class="nav-label">Discounts</span>
                    </div>
                    <span class="count-info">0</span>
                </a>
		    </li>
		
				    <li data-list='sales'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminCoupons&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-coupons-light" title="Coupons"></i>
                        <span class="nav-label">Coupons</span>
                    </div>
                    <span class="count-info">2</span>
                </a>
		    </li>
		
	<li class="menu-title menu-active" data-list-label="marketing" id="menu_marketing">
         <span class="nav-label full-menu">Marketing</span>
         <span class="nav-label toggle-menu" title="Marketing"><i class="icon-marketing-solid"></i></span>
         <span class="fa arrow"></span>
	</li>

				    <li data-list='marketing'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminPromoBanners&amp;action=pjActionIndex">
                    <div class="menu-item-title-wrap">
                        <i class="icon-promo-banner-light" title="Promo Banner"></i>
                        <span class="nav-label">Promo Banner</span>
                    </div>
                </a>
		    </li>
											    <li data-list='marketing'>
		        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionRecentReservationPopup">
                    <div class="menu-item-title-wrap">
                        <i class="icon-resent-reservation-light" title="Recent Reservation Popup"></i>
                        <span class="nav-label">Recent Reservation Popup</span>
                    </div>
                </a>
		    </li>
														<li data-list='marketing'>
					<a class="menu-link" href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionLowAvailability">
						<div class="menu-item-title-wrap">
							<i class="icon-low-availability-light" title="Low Availability"></i>
							<span class="nav-label">Low Availability</span>
						</div>
					</a>
				</li>
																<li data-list='marketing'>
					<a class="menu-link" href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionExitPopup">
						<div class="menu-item-title-wrap">
							<i class="icon-exit-pop-up" title="Exit Popup"></i>
							<span class="nav-label">Exit Popup</span>
						</div>
					</a>
				</li>
														<li data-list='marketing'>
					<a class="menu-link" href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionLastSearch">
						<div class="menu-item-title-wrap">
							<i class="icon-last-search" title="Last Search"></i>
							<span class="nav-label">Last Search</span>
						</div>
					</a>
				</li>
							                            <li data-list='marketing'>
                    <a class="menu-link" href="/online-admin/index.php?controller=pjAdminGroupsCapacity&amp;action=pjActionIndex">
                        <div class="menu-item-title-wrap">
                            <i class="icon-groups-light" title="Groups"></i>
                            <span class="nav-label">Capacity Groups</span> 
                        </div>
                        <span class="count-info">8</span>
                    </a>
                </li>
                		

			


	<li class="menu-title menu-active" data-list-label="reminders" id="menu_reminders">
         <span class="nav-label full-menu">Notifications</span>
         <span class="nav-label toggle-menu" title="Notifications"><i class="icon-notifications-solid"></i></span>
         <span class="fa arrow"></span>
	</li>

			<li data-list='reminders'>
			<a class="menu-link" href="/online-admin/index.php?controller=pjAdminReminders&amp;action=pjActionIndex">
				<div class="menu-item-title-wrap">
					<i class="icon-reminders-light" title="Reminders"></i>
					<span class="nav-label">Reminders</span>
				</div>
				<span class="count-info">3</span>
			</a>
		</li>
	
			<li data-list='reminders'>
			<a class="menu-link" href="/online-admin/index.php?controller=pjAdminBulkEmail&amp;action=pjActionIndex">
				<div class="menu-item-title-wrap">
					<i class="icon-bulk-email-light" title="Bulk Email"></i>
					<span class="nav-label">Bulk Email</span>
				</div>

			</a>
		</li>
	




		<li class="menu-title menu-active" data-list-label="settings" id="menu_settings">
             <span class="nav-label full-menu">Settings</span>
             <span class="nav-label toggle-menu" title="Settings"><i class="icon-settings-solid"></i></span>
             <span class="fa arrow"></span>
		</li>


					<li class="menu-item" data-list='settings' data-menu="reservation-process">
									<a href="#">
						<i class="icon-reservation-proccess-light" title="Reservation Process"></i>
						<span class="nav-label">Reservation Process</span>
						<span class="fa arrow"></span>
					</a>
								<ul class="nav nav-second-level collapse" data-menu="reservation-process">
																<li><a href="/online-admin/index.php?controller=pjAdminReservationProcess&amp;action=pjActionSearch">1. Search</a></li>
																<li><a href="/online-admin/index.php?controller=pjAdminReservationProcess&amp;action=pjActionCars">2. Select Car</a></li>
																<li><a href="/online-admin/index.php?controller=pjAdminReservationProcess&amp;action=pjActionCheckout">3. Checkout</a></li>
																<li><a href="/online-admin/index.php?controller=pjAdminReservationProcess&amp;action=pjActionComplete">4. Complete</a></li>
																<li><a href="/online-admin/index.php?controller=pjAdminReservationProcess&amp;action=pjActionEmailSettings">Notifications</a></li>
					
											<li><a href="/online-admin/index.php?controller=pjAdminReservationProcess&amp;action=pjActionBurgerMenu">Burger Menu</a></li>
																<li><a href="/online-admin/index.php?controller=pjAdminReservationProcess&amp;action=pjActionBackoffice">Backoffice</a></li>
					


				</ul>
			</li>
				

				    <li class="menu-item" data-list='settings' data-menu="menu-options">
		        <a href="#" title="Options">
                    <i class="icon-options-light" title="Options"></i>
                    <span class="nav-label">Options</span>
                    <span class="fa arrow"></span>
                </a>
		        <ul class="nav nav-second-level collapse" data-menu="menu-options">
										<li>
						<a href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionCompanySettings">Company Settings</a>
					</li>
																<li>
							<a href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionBooking">Rental Settings</a>
						</li>
										
							                <li>
                            <a href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionStatusSettings">Statuses</a>
                        </li>
		            
                    		                <li>
                            <a href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionPaymentMethods">Payment Methods</a>
                        </li>
		            							                <li>
                            <a href="/online-admin/index.php?controller=pjPayments&amp;action=pjActionIndex">Payment Gateways</a>
                        </li>
		            
					
					
												<li><a href="/online-admin/index.php?controller=pjAdminReservationProcess&amp;action=pjActionContractSettings">Contract</a></li>
											
					
											<li>
                            <a href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionAges">Age Groups</a>
                        </li>
																<li>
                            <a href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionZoneHours">Hour Zones</a>
                        </li>
																<li>
                            <a href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionWorkingSchedule">Working Schedule</a>
                        </li>
					
		            		                <li>
                            <a href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionTerm">Terms</a>
                        </li>
		            
		        </ul>
		    </li>
	


<script>
jQuery(document).ready(function(){

var menu_array=JSON.parse(sessionStorage.getItem("menu_array"));
// $('*[data-list]').addClass('item-inactive');

jQuery('.menu-title').each(function(index){
	var menu_id=$(this).attr("id");
	var data_list=jQuery(this).attr('data-list-label');

	if(jQuery.inArray($(this).attr("id"), menu_array) !== -1){
		jQuery('#'+menu_id).removeClass('menu-active');

		$('*[data-list="'+data_list+'"]').removeClass('item-active');
		$('*[data-list="'+data_list+'"]').addClass('item-inactive');
	}

});


jQuery('.menu-title').on('click',function(e){
	var data_list=jQuery(this).attr('data-list-label');

	if(jQuery('*[data-list="'+data_list+'"]').is(':visible')){
		jQuery('*[data-list-label="'+data_list+'"]').removeClass('menu-active');
		$('*[data-list="'+data_list+'"]').removeClass('item-active');
		$('*[data-list="'+data_list+'"]').addClass('item-inactive');
	}
	else{
		jQuery('*[data-list-label="'+data_list+'"]').addClass('menu-active');
		$('*[data-list="'+data_list+'"]').removeClass('item-inactive');
		$('*[data-list="'+data_list+'"]').addClass('item-active');

	}

	var menu_inactive_items = [];
	jQuery('.menu-title').each(function(index){
		if(!jQuery(this).hasClass('menu-active')){
			menu_inactive_items.push($(this).attr('id'));
		}

	});
	var menu_array=sessionStorage.setItem('menu_array',JSON.stringify(menu_inactive_items));

	});

});
</script>
<!-- ping to keep-alive session -->
<script type="text/javascript">
    setInterval(function() {
        // console.log('Ping session to keep it alive...');
        fetch(window.location.href, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
    }, 600000); // Κάθε 10 δευτερόλεπτα (600000 ms)
</script>
            
                            <li class="menu-item" data-list='settings' data-settings='system-settings' data-menu='system-settings'>
                    <a href="#">
                        <i class="icon-system-options-light" title="System Options"></i>
                        <span class="nav-label">System Options</span>
                        <span class="fa arrow"></span>
                    </a>
                    <ul class="nav nav-second-level collapse" data-menu='system-settings'>
                                                    <li><a href="/online-admin/index.php?controller=pjBaseOptions&amp;action=pjActionIndex">General</a></li>
                        
												                        
													<li><a href="/online-admin/index.php?controller=pjBaseOptions&amp;action=pjActionPrices">Bulk Pricing</a></li>
						
                        							<li><a href="/online-admin/index.php?controller=pjBaseOptions&amp;action=pjActionUploadFleet">Upload Fleet</a></li>
						                        
                        
                                                
                        
                        
						                                                        
						                            <li ><a href="/online-admin/index.php?controller=pjAdminOptions&action=pjActionTagManager">Tag Manager</a></li>
                                                
                        
                        
                        
						
                        
                                            </ul>
                </li>
            

			
					<li class="menu-title menu-active" data-list-label="users" id="users">
                         <span class="nav-label full-menu">Users</span>
                         <span class="nav-label toggle-menu" title="Users"><i class="icon-users-solid"></i></span>
                         <span class="fa arrow"></span>
					</li>


										    <li data-list='users'>
					        <a class="menu-link" href="/online-admin/index.php?controller=pjAdminCustomers&amp;action=pjActionIndex">
                                <div class="menu-item-title-wrap">
                                    <i class="icon-customers-light" title="Customers"></i>
                                    <span class="nav-label">Customers</span>
                                </div>
                                <span class="count-info">24</span>
                            </a>
					    </li>
					
                    
					                         
                    
		            


	<li class="menu-title menu-active" data-list-label="admin" id="menu_admin">
         <span class="nav-label full-menu">Admin</span>
         <span class="nav-label toggle-menu" title="Admin"><i class="icon-admin-solid"></i></span>
         <span class="fa arrow"></span>
	</li>
		
    				<li data-list='admin'>
					<a class="menu-link" href="/online-admin/index.php?controller=pjAdminLogs&amp;action=pjActionIndex">
						<div class="menu-item-title-wrap">
							<i class="icon-logs-light" title="Logs"></i>
							<span class="nav-label">Logs</span>
						</div>
					</a>
				</li>
								        <li data-list='admin'>
				<a class="menu-link" href="/online-admin/index.php?controller=pjAdminOptions&amp;action=pjActionBasicPlugins">
					<div class="menu-item-title-wrap">
						<i class="icon-plugins-light" title="Plugins"></i>
						<span class="nav-label">Plugins</span>
					</div>

				</a>
			</li>
				

						        </ul>
    </div>

</nav><!-- /Static Sidebar -->
<div class="menu-sidebar-overlay"></div>							<div id="page-wrapper" class="site-content gray-bg">
					<div class="top-bar-row row border-bottom">
    <nav class="navbar navbar-static-top" style="margin-bottom: 0" data-user="Fotis Koukakis">
        <div class="navbar-header">
            <button><i class="fa fa-bars"></i> </button>
        </div>

        <ul class="nav navbar-top-links navbar-right">
                            <li>
                    <button class="changelog-button">
                        <!-- <i class="far fa-bell"></i> -->
                        <!-- <i class="fas fa-clipboard-list"></i> -->
                        <div class="additions-wrap alt-color">
                            <span class="icon-nightstar small"></span>
                            <span class="icon-nightstar medium"></span>
                            <span class="icon-nightstar large"></span>
                        </div>
                        <i class="icon-logs-light" title="Changelog"></i>
                    </button>    
                </li>
                <li>
                    <span class="desktop-only">Welcome, Fotis Koukakis.</span>
                    <span class="mobile-only">Fotis Koukakis</span>
                </li>
                <li  style="margin-left: auto;">
                    <a href="/online-admin/index.php?controller=pjBaseUsers&amp;action=pjActionProfile">
                        <i class="icon-profile-light"></i> Profile                    </a>
                </li>
                <li>
                    <a href="/online-admin/index.php?controller=pjBase&amp;action=pjActionLogout">
                        <i class="icon-log-out-light"></i>Log out                    </a>
                </li>
            
        </ul>
    </nav><!-- / Navbar Top -->
</div><!-- /.row -->

<div class="feedback-outer-wrap">
    
<div class="feedback-form">
    <svg class="feedback-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24" fill="white">
        <path d="M64 304C64 358.4 83.3 408.6 115.9 448.9L67.1 538.3C65.1 542 64 546.2 64 550.5C64 564.6 75.4 576 89.5 576C93.5 576 97.3 575.4 101 573.9L217.4 524C248.8 536.9 283.5 544 320 544C461.4 544 576 436.5 576 304C576 171.5 461.4 64 320 64C178.6 64 64 171.5 64 304zM158 471.9C167.3 454.8 165.4 433.8 153.2 418.7C127.1 386.4 112 346.8 112 304C112 200.8 202.2 112 320 112C437.8 112 528 200.8 528 304C528 407.2 437.8 496 320 496C289.8 496 261.3 490.1 235.7 479.6C223.8 474.7 210.4 474.8 198.6 479.9L140 504.9L158 471.9zM208 336C225.7 336 240 321.7 240 304C240 286.3 225.7 272 208 272C190.3 272 176 286.3 176 304C176 321.7 190.3 336 208 336zM352 304C352 286.3 337.7 272 320 272C302.3 272 288 286.3 288 304C288 321.7 302.3 336 320 336C337.7 336 352 321.7 352 304zM432 336C449.7 336 464 321.7 464 304C464 286.3 449.7 272 432 272C414.3 272 400 286.3 400 304C400 321.7 414.3 336 432 336z"/>
    </svg>
</div>
 
<div class="feedback-form-box-wrapper">
    <div class="feedback-header">
        <p class="feedback-form-title text bold medium-large">
            Feedback Form        </p>
        <button class="close-feedback">
            <span class="circle"></span>
            <span class="line"></span>
        </button>
    </div>
    <div class="feedback-inner-wrap">
        <p class="feedback-form-description">
        We appreciate the time you have taken to help us improve our site & service. Please use the form below to provide us your feedback.        </p>
        <ul class="feedback-items-wrapper">
                        <li class="feedback-item text medium-large regular" data-category="Suggestion" data-description=" Suggestion">
                <span class="icon-lightbulb "></span>
                Suggestion            </li>
            <li class="feedback-item text medium-large regular" data-category="Report Bug" data-description="Report a bug">
                <span class="icon-attempts"></span>
                Report a bug            </li>
            <li class="feedback-item text medium-large regular" data-category="Compliment" data-description="Send a compliment">
                <span class="icon-like"></span>
                Send a compliment            </li>
            <li class="feedback-item text medium-large regular" data-category="Complaint" data-description="Make a complaint">
                <span class="icon-commenting-o"></span>
                Make a complaint            </li>
        </ul>
    </div>
</div>

<div class="feedback-message-wrapper">
    <div class="feedback-header">
        <p class="feedback-form-title text bold medium-large">
            Feedback        </p>
        <button class="close-feedback">
            <span class="circle"></span>
            <span class="line"></span>
        </button>
    </div>

    <div class="feedback-inner-wrap">
        <!-- <label for="message_content" class="feedback-message-description text medium-large regular">

        </label> -->

        <form class="feedback-message-content">

            <div class="new-model-wrap model_suggestion_section" style="display:none">
                <label for="make" class="feedback-message-make text medium-large regular"> Make</label>
                <input type="text" id="make" name="make" class="feedback_field model_suggestion_field form-control"  value=""/>
                <label for="model" class="feedback-message-model text medium-large regular">Model</label>
                <input type="text" id="model" name="model" class="feedback_field model_suggestion_field form-control"  value=""/>
                <label for="year" class="feedback-message-year text medium-large regular">Year</label>
                <input type="text" id="year" name="year" class="feedback_field model_suggestion_field form-control"  value=""/>
                <label for="color" class="feedback-message-year text medium-large regular">Color (Optional)</label>
                <input type="text" id="color" name="color" class="feedback_field model_suggestion_field form-control"  value=""/>
            </div>
            

            <textarea name="message_content" id="message_content" class="feedback_field feedback_section form-control feedback_required" placeholder="Type your message"></textarea>


            <div class="files-attachment-wrap">
                <label class="btn btn-primary btn-m btn-outline file-input">
                    <input type="file" name="file" hidden class="hidden">
                    <span class="icon-attachment"></span>
                    Attach Files                </label>

                <ol class="files-wrap">
                </ol>
            </div>


            <input type='hidden' id='feedback_controller' name='feedback_controller' value="pjAdmin"  class="feedback_field"/>
            <input type='hidden' id='feedback_action' name='feedback_action' value="pjActionIndex"  class="feedback_field"/>
            <input type='hidden' id='feedback_url' name='feedback_url' value=""  class="feedback_field"/>
            <input type='hidden' name='category' value=""  class="feedback_field" id='category'/>

            <div class="feedback-message-button">
                <button id="send_to_support" type="submit" class="btn btn-primary btn-m">Send</button>
                <button type="button" class="btn btn-primary btn-m btn-outline feedback-back">Back</button>  
            </div>

        </form>

    </div>

</div>

<div class="feedback-result">
    <div class="feedback-header">
        <p class="feedback-form-title text bold medium-large">
        Feedback Form        </p>
    </div>
    <div class="feedback-inner-wrap">
        <p class="feedback-result-title text medium-large regular"></p>
        <p class="feedback-result-description"></p>
    </div>
</div>


<script>

    jQuery('.feedback-form, .close-feedback').on('click', function() {
        showFeedbackView();
    });

    jQuery('.feedback-item').on('click',function(){
        var category = jQuery(this).attr('data-category');
        var description = jQuery(this).attr('data-description');
        // console.log(category);
        feedbackItem(category, description);
        
    });

    jQuery('.feedback-back').on('click',function(){
        backButton();
    });

    var showFeedbackView = function() {
        jQuery('.feedback-form').toggleClass('feedback-hide');
        jQuery('.feedback-form-box-wrapper').toggleClass('active');
    };

    var feedbackItem = function(category, description) {
        jQuery('[name="category"]').val(category);
        jQuery('.feedback-message-wrapper .feedback-form-title').html(description);
        jQuery('.feedback-message-wrapper .feedback-message-description').html(description);
        if(category == "Model Suggestion"){
            jQuery('.model_suggestion_section').show();
            jQuery('.model_suggestion_field').addClass('feedback_required');
            jQuery('#color').removeClass('feedback_required');
            jQuery('.feedback_section').hide();
            jQuery('.feedback_section').removeClass('feedback_required');
        } else {
            jQuery('.model_suggestion_section').hide();
            jQuery('.model_suggestion_field').removeClass('feedback_required');
            jQuery('.feedback_section').show();
            jQuery('.feedback_section').addClass('feedback_required');

        }
        jQuery('.feedback-form-box-wrapper').toggleClass('active');
        jQuery('.feedback-message-wrapper').toggleClass('active');
    };

    var backButton = function() {
        jQuery('.feedback-form-box-wrapper').toggleClass('active');
        jQuery('.feedback-message-wrapper').toggleClass('active');
        jQuery('.feedback_required').removeClass('has-error');
    };

    document.addEventListener('click', function(event) {
        jQuery('.feedback_required').each(function() {
            if (!jQuery(this).val() == '' || !jQuery(this).val() == null) {
                jQuery(this).removeClass('has-error');
            }
        });
    }, false);

    jQuery('.feedback-message-content').on('submit' , function(e){
        if (e && e.preventDefault) {
            e.preventDefault();
            jQuery('#send_to_support').click();
        }
    });

    jQuery('.file-input').on('change', function(e) {
        var file = e.target.files[0];//getting first file
        if (file) {
            var fileName = file.name;
            uploadFile(fileName);

            if(fileName.length >= 12){
               var splitName = fileName.split('.');
               var nameEllipsis = splitName[0].substring(0, 13) + "... ." + splitName[splitName.length - 1];
            }

            //  jQuery('.files-wrap').append('<li title="' + fileName + '"><iframe src="' + URL.createObjectURL(file) + '"></iframe>' + nameEllipsis + '</li>');
            if (isImage(fileName) == true) {
                jQuery('.files-wrap').append('<li title="' + fileName + '"><img src="' + URL.createObjectURL(file) + '"/>' + nameEllipsis + '</li>');
            } else {
                jQuery('.files-wrap').append('<li title="' + fileName + '">' + nameEllipsis + '</li>');
            }

        }
    });

    let form = document.querySelector('.feedback-message-content');

    var uploadFile = function(name) {
        jQuery("#send_to_support").hide();
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "index.php?controller=pjAdmin&action=uploadFile");
        xhr.upload.addEventListener("progress", ({loaded, total}) =>{
            let button = document.getElementById('send_to_support')
            if(loaded == total){
                // console.log('ready');

            }
        });
        xhr.addEventListener("load", function() {
            jQuery("#send_to_support").show();
            // Το αίτημα ολοκληρώθηκε
            // if (xhr.status === 200) {

            //     // Επιτυχής απάντηση από τον διακομιστή
            //     // Εδώ μπορείτε να εκτελέσετε την επόμενη ενέργεια
            // } else {
            //     // Αποτυχία από τον διακομιστή
            //     // Εδώ μπορείτε να χειριστείτε τυχόν σφάλματα
            // }
        });

        let data = new FormData(form);
        xhr.send(data);
    }

    var deleteFeedbackFiles = function() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "index.php?controller=pjAdmin&action=deleteFeedbackFiles");
        let data = new FormData(form);
        xhr.send(data);
    }

    jQuery(document).ready(function() {
        deleteFeedbackFiles();
    });

    //thomas changed close-feedback to close icon fixed bug
    jQuery(document).off('click', '.close-feedback').on('click', '.close-feedback', function(e) { 
        e.preventDefault();
        jQuery('.feedback-form-box-wrapper, .feedback-message-wrapper, .feedback-result').removeClass('active');
        jQuery('.feedback-form').removeClass('feedback-hide'); // show round button again
    });

    function isImage(url) {
      return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    jQuery('#send_to_support').on('click',function(e){
        e.preventDefault();

        var has_empty = false;
        var feedback_fields='';
        jQuery('.feedback_required').each(function(){
            if(jQuery(this).val() == '' || jQuery(this).val() == null || jQuery(this).val() == 'undefined'){
                has_empty=true;
                jQuery(this).addClass('has-error');
            }
        });


        if(has_empty == false ){

            jQuery('.feedback_field').each(function(){
                feedback_fields = feedback_fields+'&'+jQuery(this).attr('name')+'='+jQuery(this).val();
            });

            var resp = $.post("index.php?controller=pjAdmin&action=pjActionSendFeedback",feedback_fields).done(function (data) {
                // console.log(resp);

                var title = resp.responseJSON.response.title;
                var description = resp.responseJSON.response.description;
                var successIcon = '<span class="icon-check check-color"></span>'
                jQuery('.feedback-result-title').html(title);
                if (resp.status == 200) {
                    jQuery('.feedback-result-title').append(successIcon);
                }
                jQuery('.feedback-result-description').html(description);
                jQuery('.feedback-result').addClass('active');
                jQuery('.feedback-message-wrapper').removeClass('active');

                setTimeout(function() {
                   jQuery(".feedback-result").removeClass('active');
                   jQuery('.feedback-form').removeClass('feedback-hide');
                   jQuery('#message_content').val('');
                   jQuery('.model_suggestion_field').val(''); 
                   jQuery('.files-wrap li').remove();
               }, 5000);

            });

        }

    });

</script>
</div>


<div class="dashboard-wrapper wrapper-content">
	<div class="heading-row wrapper page-heading">
		<h1 class="title medium-large">Dashboard</h1>
        <div class="pull-right">
                        <a data-toggle="collapse pull-right" style="display:none" data-parent="#accordion" href="#collapseEditFields" class="btn btn-primary btn-sm btn-outline">Edit Dashboard Fields</a>
        </div>
	</div>
    <div id="collapseEditFields" class="collapse m-t-md">
        <div class="m-b-lg">
            <ul class="agile-list no-padding">
                <li class="success-element b-r-sm">
                    <div class="panel-body">
                                                <div id='dashboard_sortable_list'>
                                                            <div class='sortable_item'>
                                    <input type="checkbox" id="dashboard-checkbox-overview" name="dashboard_grid_fields" class='grid-field dashboard-grid-field' value='overview'
                                    checked                                    >
                                    <label for="dashboard-checkbox-overview">Overview</label>
                                </div>
                                                                <div class='sortable_item'>
                                    <input type="checkbox" id="dashboard-checkbox-vehicle_info" name="dashboard_grid_fields" class='grid-field dashboard-grid-field' value='vehicle_info'
                                    checked                                    >
                                    <label for="dashboard-checkbox-vehicle_info">Vehicle Info</label>
                                </div>
                                                                <div class='sortable_item'>
                                    <input type="checkbox" id="dashboard-checkbox-today_pickups" name="dashboard_grid_fields" class='grid-field dashboard-grid-field' value='today_pickups'
                                    checked                                    >
                                    <label for="dashboard-checkbox-today_pickups">Today Pickups</label>
                                </div>
                                                                <div class='sortable_item'>
                                    <input type="checkbox" id="dashboard-checkbox-today_dropoffs" name="dashboard_grid_fields" class='grid-field dashboard-grid-field' value='today_dropoffs'
                                    checked                                    >
                                    <label for="dashboard-checkbox-today_dropoffs">Today Dropoffs</label>
                                </div>
                                                                <div class='sortable_item'>
                                    <input type="checkbox" id="dashboard-checkbox-new_reservations" name="dashboard_grid_fields" class='grid-field dashboard-grid-field' value='new_reservations'
                                    checked                                    >
                                    <label for="dashboard-checkbox-new_reservations">New Reservations</label>
                                </div>
                                                                <div class='sortable_item'>
                                    <input type="checkbox" id="dashboard-checkbox-available_cars" name="dashboard_grid_fields" class='grid-field dashboard-grid-field' value='available_cars'
                                    checked                                    >
                                    <label for="dashboard-checkbox-available_cars">Available Cars</label>
                                </div>
                                                                <div class='sortable_item'>
                                    <input type="checkbox" id="dashboard-checkbox-insurance_expirations" name="dashboard_grid_fields" class='grid-field dashboard-grid-field' value='insurance_expirations'
                                    checked                                    >
                                    <label for="dashboard-checkbox-insurance_expirations">Insurance Expirations</label>
                                </div>
                                                                <div class='sortable_item'>
                                    <input type="checkbox" id="dashboard-checkbox-vehicle_services" name="dashboard_grid_fields" class='grid-field dashboard-grid-field' value='vehicle_services'
                                    checked                                    >
                                    <label for="dashboard-checkbox-vehicle_services">Vehicle Services</label>
                                </div>
                                                                <div class='sortable_item'>
                                    <input type="checkbox" id="dashboard-checkbox-kteo_checks" name="dashboard_grid_fields" class='grid-field dashboard-grid-field' value='kteo_checks'
                                    checked                                    >
                                    <label for="dashboard-checkbox-kteo_checks">Kteo Checks</label>
                                </div>
                                                        </div>
                        <br>
                        <input type='hidden' id='dashboard_grid_fields' name='dashboard_grid_fields' class='form-control' value='overview|vehicle_info|today_pickups|today_dropoffs|new_reservations|available_cars|insurance_expirations|vehicle_services|kteo_checks'>
                    </br>
                    <input type='hidden' id='dashboard_grid_fields_total' name='dashboard_grid_fields_total'  class='form-control' value='overview|vehicle_info|today_pickups|today_dropoffs|new_reservations|available_cars|insurance_expirations|vehicle_services|kteo_checks'>
                    </br>
                        <button class='savedashboadfields btn btn-primary btn-outline'>Save</button>

                    </div>
                </li>
            </ul>
        </div>
    </div>

    

	<section class="main-dashboard-section statistics-half-section section-margins">
					<div class="dashboard-overview overview-section statistics-box-wrap">
			                        <div class="single-dashboard-overview border-bottom">
                        <span class="section-box-title main-color">Overview</span>
                        <span class="text-info">new reservations today</span>
                        <div class="main-overview-reservations">
                            <i class="far fa-calendar-check alt-color"></i>
                            <p class="main-color big-label">0</p>
                        </div>

                    </div>
				                                    <div class="single-dashboard-overview border-bottom">
                        <span class="section-box-title main-color">Today</span>
                        <div class="inner-dashboard-wrapper">
                            <div class="inner-single-dashboard">
                                <span class="text-info">Pick-ups</span>
                                <p class="main-color big-label">0</p>
                            </div>

                            <div class="inner-single-dashboard">
                                <span class="text-info">Drop-offs</span>
                                <p class="main-color big-label">0</p>
                            </div>
                        </div>
                    </div>
												<div class="single-dashboard-overview border-bottom">
					<span class="section-box-title main-color">Tomorrow</span>

					<div class="inner-dashboard-wrapper">
						<div class="inner-single-dashboard">
							<span class="text-info">Pick-ups</span>
							<p class="main-color big-label">0</p>
						</div>

						<div class="inner-single-dashboard">
							<span class="text-info">Drop-offs</span>
							<p class="main-color big-label">0</p>
						</div>
					</div>
				</div>
				
				<div class="quick-links">
					<span class="section-box-title main-color">Quick Links</span>
					<div class="quick_links-wrapper overview-section">
													<a href='/online-admin/index.php?controller=pjAdminStatistics&action=pjActionIndex'>Statistics</a>
																			<a href='/online-admin/index.php?controller=pjAdminBookingCalendar&action=pjActionIndex'>Calendar</a>
																			<a href='/online-admin/index.php?controller=pjAdminBookings&action=pjActionIndex'>Reservations</a>
																			<a href='/online-admin/index.php?controller=pjAdminTypes&action=pjActionIndex'>Types</a>
																									<a href='/online-admin/index.php?controller=pjAdminVehicles&action=pjActionIndex'>Vehicles</a>
																			<a href='/online-admin/index.php?controller=pjAdminExtras&action=pjActionIndex'>Extras</a>
																			<a href='/online-admin/index.php?controller=pjAdminInsurances&action=pjActionIndex'>Insurances</a>
																			<a href='/online-admin/index.php?controller=pjAdminLocations&action=pjActionIndex'>Locations</a>
											</div>
				</div>
			</div>
						            <div class="dashboard-extra-services statistics-box-wrap">
                <div class="fleet-info">
                    
                                            <div class="single-fleet-info">
                            <span class="section-box-title main-color">Insurance Expiration</span>
                            <div class='service-expiration'>
                                                                    <a href='https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjAdminVehicles&action=pjActionUpdate&id=111' class='expired-date'>
                                                                                02/02/2023 | EMN7457 | Toyota Aygo                                    </a><br>
                                                                        <a href='https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjAdminVehicles&action=pjActionUpdate&id=133' class='expired-date'>
                                                                                02/04/2024 | EMN7458 | Toyota Aygo                                    </a><br>
                                                                        <a href='https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjAdminVehicles&action=pjActionUpdate&id=205' class='expired-date'>
                                                                                02/04/2024 | ZET603 | Scooter 125 cc                                    </a><br>
                                                                </div>
                            <a href="https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjAdminFleetInfo&action=pjActionVehicleInsurance " class="btn btn-primary btn-sm btn-outline m-n">View all</a>
                        </div>
                                        
                                            <div class="single-fleet-info">
                            <span class="section-box-title main-color">Services</span>
                            <div class='service-expiration'>
                                                                    <a href='https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjAdminVehicles&action=pjActionUpdate&id=111' class='expired-date'>
                                                                                24/03/2023 | EMN7457 | Toyota Aygo                                    </a><br>
                                                                </div>
                            <a href="https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjAdminFleetInfo&action=pjActionVehicleService " class="btn btn-primary btn-sm btn-outline m-n">View all</a>
                        </div>
                    
                                            <div class="single-fleet-info">
                            <span class="section-box-title main-color">KTEO Checks</span>
                            <div class='service-expiration'>
                                                                    <a href='https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjAdminVehicles&action=pjActionUpdate&id=111' class='expired-date'>
                                                                                02/02/2023 | EMN7457 | Toyota Aygo                                    </a><br>
                                                                        <a href='https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjAdminVehicles&action=pjActionUpdate&id=133' class='expired-date'>
                                                                                02/04/2024 | EMN7458 | Toyota Aygo                                    </a><br>
                                                                        <a href='https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjAdminVehicles&action=pjActionUpdate&id=205' class='expired-date'>
                                                                                02/04/2024 | ZET603 | Scooter 125 cc                                    </a><br>
                                                                </div>
                            <a href="https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjAdminFleetInfo&action=pjActionVehicleKteo "  class="btn btn-primary btn-sm btn-outline m-n">View all</a>
                        </div>
                    
                </div>

            </div>
		
	</section>

 

			

                    <div class="dashboard-split-grid statistics-half-section reservations-today-sections">
                <div class="grid-wrapper pickup_section" data-action="pjActionGetPickupBookings" data-searchby="pickup">
                    <div class="grid-heading-wrap">
                        <h3 class="content regular large"><span data-today="Today" class="date">Today</span> Pick-ups</h3> <!-- giorgos allagh sto lbldashpickupstommorow-->
                        <div class="filter-dates-wrap">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseEditFieldsPickup" class="btn btn-sm btn-primary btn-outline">Edit Fields</a>
                                                        <a href="https://antiparosrentacar.gocars.gr/online-admin/app/web/upload/PickupBookings.xlsx" class="btn btn-default" id="download_dashboard_pickup_excel" download>Download Report</a>
                            <button type="button" value="2025-10-16" class="btn btn-default btn-today btn-filter " data-column="filter" data-value="today">Today</button>
                            <button type="button" value="2025-10-15" class="btn btn-default btn-prev btn-filter " data-column="filter" data-value="prev"><i class="fa fa-step-backward"></i></button>
                            <button type="button" value="2025-10-17" class="btn btn-default btn-next btn-filter " data-column="filter" data-value="next"><i class="fa fa-step-forward"></i></button>
                            <input type="hidden" name="search">
                        </div>
                    </div>
                    <input type='hidden' name='pickup_fields' id='pickup_fields' value='total_price|pickup_time|booking_id|pickup_location|car_info|status|client'/>
                    <input type='hidden' name='return_fields' id='return_fields' value='accommodation_name|pickup_time|booking_id|type_name|model_name|car_info|c_notes|status|return_location|download_contract|download_voucher|agent_name|fuel'/>
					<div id="collapseEditFieldsPickup" class="collapse">
						<div class="m-b-lg">
							<ul class="agile-list no-padding">
								<li class="success-element b-r-sm">
									<div class="panel-body">
																				<div id='pickup_sortable_list'>
											                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-c_notes" name="pickup_grid_fields" class='pickup-grid-field' value='c_notes'
																										>
													<label for="checkbox-c_notes">Notes</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-total_price" name="pickup_grid_fields" class='pickup-grid-field' value='total_price'
													checked													>
													<label for="checkbox-total_price">Total</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-pickup_time" name="pickup_grid_fields" class='pickup-grid-field' value='pickup_time'
													checked													>
													<label for="checkbox-pickup_time">Time</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-booking_id" name="pickup_grid_fields" class='pickup-grid-field' value='booking_id'
													checked													>
													<label for="checkbox-booking_id">Reservation ID</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-pickup_location" name="pickup_grid_fields" class='pickup-grid-field' value='pickup_location'
													checked													>
													<label for="checkbox-pickup_location">Pick-up Location</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-type_name" name="pickup_grid_fields" class='pickup-grid-field' value='type_name'
																										>
													<label for="checkbox-type_name">Type</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-car_info" name="pickup_grid_fields" class='pickup-grid-field' value='car_info'
													checked													>
													<label for="checkbox-car_info">Vehicle</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-status" name="pickup_grid_fields" class='pickup-grid-field' value='status'
													checked													>
													<label for="checkbox-status">Status</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-model_name" name="pickup_grid_fields" class='pickup-grid-field' value='model_name'
																										>
													<label for="checkbox-model_name">Model</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-client" name="pickup_grid_fields" class='pickup-grid-field' value='client'
													checked													>
													<label for="checkbox-client">Client</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-return_datetime" name="pickup_grid_fields" class='pickup-grid-field' value='return_datetime'
																										>
													<label for="checkbox-return_datetime">Return</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-c_flightnumber" name="pickup_grid_fields" class='pickup-grid-field' value='c_flightnumber'
																										>
													<label for="checkbox-c_flightnumber">Flight Number</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-insurance_items" name="pickup_grid_fields" class='pickup-grid-field' value='insurance_items'
																										>
													<label for="checkbox-insurance_items">Insurances</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-extra_items" name="pickup_grid_fields" class='pickup-grid-field' value='extra_items'
																										>
													<label for="checkbox-extra_items">Extras</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-return_location" name="pickup_grid_fields" class='pickup-grid-field' value='return_location'
																										>
													<label for="checkbox-return_location">Drop-off Location</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-download_contract" name="pickup_grid_fields" class='pickup-grid-field' value='download_contract'
																										>
													<label for="checkbox-download_contract">Download Contract</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-download_voucher" name="pickup_grid_fields" class='pickup-grid-field' value='download_voucher'
																										>
													<label for="checkbox-download_voucher">Download Booking PDF</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-accommodation_name" name="pickup_grid_fields" class='pickup-grid-field' value='accommodation_name'
																										>
													<label for="checkbox-accommodation_name">Local Residence</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-fuel" name="pickup_grid_fields" class='pickup-grid-field' value='fuel'
																										>
													<label for="checkbox-fuel">Vehicle Fuel</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="checkbox-agent_name" name="pickup_grid_fields" class='pickup-grid-field' value='agent_name'
																										>
													<label for="checkbox-agent_name">Agent</label>
												</div>
																						</div>
										<br>
										<input type='hidden' id='pickup_grid_fields' name='grid_fields' value='total_price|pickup_time|booking_id|pickup_location|car_info|status|client'>
									</br>
									<input type='hidden' id='pickup_grid_fields_total' name='grid_fields_total' value='c_notes|total_price|pickup_time|booking_id|pickup_location|type_name|car_info|status|model_name|client|return_datetime|c_flightnumber|insurance_items|extra_items|return_location|download_contract|download_voucher|accommodation_name|fuel|agent_name|vehicle_condition'>
									</br>
										<button class='savepickupfields btn btn-primary btn-outline'>Save</button>

									</div>
								</li>
							</ul>
						</div>
					</div>
                    <div id='pickup_grid' class="dashboard-grid-content"></div>
                </div>
                <div class="grid-wrapper return_section" data-action="pjActionGetReturnBookings" data-searchby="return">
                    <div class="grid-heading-wrap">
                        <h3 class="content regular large"><span data-today="Today" class="date">Today</span> Drop-offs</h3> <!-- giorgos --->
                        <div class="filter-dates-wrap">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseEditFieldsReturn" class="btn btn-sm btn-primary btn-outline">Edit Fields</a>
                                                        <a href="https://antiparosrentacar.gocars.gr/online-admin/app/web/upload/ReturnBookings.xlsx" class="btn btn-default" id="download_dashboard_pickup_excel" download>Download Report</a>
                            <button type="button" value="2025-10-16" class="btn btn-default btn-today btn-filter " data-column="filter" data-value="today">Today</button>
                            <button type="button" value="2025-10-15" class="btn btn-default btn-prev btn-filter " data-column="filter" data-value="prev"><i class="fa fa-step-backward"></i></button>
                            <button type="button" value="2025-10-17" class="btn btn-default btn-next btn-filter " data-column="filter" data-value="next"><i class="fa fa-step-forward"></i></button>
                            <input type="hidden" name="search">
                        </div>
                    </div>
                    <div id="collapseEditFieldsReturn" class="collapse">
						<div class="m-b-lg">
							<ul class="agile-list no-padding">
								<li class="success-element b-r-sm">
									<div class="panel-body">
																				<div id='return_sortable_list'>
											                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-accommodation_name" name="return_grid_fields" class='return-grid-field' value='accommodation_name'
													checked													>
													<label for="return-checkbox-accommodation_name">Local Residence</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-insurance_items" name="return_grid_fields" class='return-grid-field' value='insurance_items'
																										>
													<label for="return-checkbox-insurance_items">Insurances</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-extra_items" name="return_grid_fields" class='return-grid-field' value='extra_items'
																										>
													<label for="return-checkbox-extra_items">Extras</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-return_time" name="return_grid_fields" class='return-grid-field' value='return_time'
																										>
													<label for="return-checkbox-return_time">Time</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-c_departure_flightnumber" name="return_grid_fields" class='return-grid-field' value='c_departure_flightnumber'
																										>
													<label for="return-checkbox-c_departure_flightnumber">Departure Flight Number</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-pickup_time" name="return_grid_fields" class='return-grid-field' value='pickup_time'
													checked													>
													<label for="return-checkbox-pickup_time">Time</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-booking_id" name="return_grid_fields" class='return-grid-field' value='booking_id'
													checked													>
													<label for="return-checkbox-booking_id">Reservation ID</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-type_name" name="return_grid_fields" class='return-grid-field' value='type_name'
													checked													>
													<label for="return-checkbox-type_name">Type</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-pickup_location" name="return_grid_fields" class='return-grid-field' value='pickup_location'
																										>
													<label for="return-checkbox-pickup_location">Pick-up Location</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-model_name" name="return_grid_fields" class='return-grid-field' value='model_name'
													checked													>
													<label for="return-checkbox-model_name">Model</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-car_info" name="return_grid_fields" class='return-grid-field' value='car_info'
													checked													>
													<label for="return-checkbox-car_info">Vehicle</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-client" name="return_grid_fields" class='return-grid-field' value='client'
																										>
													<label for="return-checkbox-client">Client</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-c_notes" name="return_grid_fields" class='return-grid-field' value='c_notes'
													checked													>
													<label for="return-checkbox-c_notes">Notes</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-status" name="return_grid_fields" class='return-grid-field' value='status'
													checked													>
													<label for="return-checkbox-status">Status</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-return_datetime" name="return_grid_fields" class='return-grid-field' value='return_datetime'
																										>
													<label for="return-checkbox-return_datetime">Return</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-c_flightnumber" name="return_grid_fields" class='return-grid-field' value='c_flightnumber'
																										>
													<label for="return-checkbox-c_flightnumber">Flight Number</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-total_price" name="return_grid_fields" class='return-grid-field' value='total_price'
																										>
													<label for="return-checkbox-total_price">Total</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-return_location" name="return_grid_fields" class='return-grid-field' value='return_location'
													checked													>
													<label for="return-checkbox-return_location">Drop-off Location</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-download_contract" name="return_grid_fields" class='return-grid-field' value='download_contract'
													checked													>
													<label for="return-checkbox-download_contract">Download Contract</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-download_voucher" name="return_grid_fields" class='return-grid-field' value='download_voucher'
													checked													>
													<label for="return-checkbox-download_voucher">Download Booking PDF</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-agent_name" name="return_grid_fields" class='return-grid-field' value='agent_name'
													checked													>
													<label for="return-checkbox-agent_name">Agent</label>
												</div>
												                                                <div class='sortable_item'>
													<input type="checkbox" id="return-checkbox-fuel" name="return_grid_fields" class='return-grid-field' value='fuel'
													checked													>
													<label for="return-checkbox-fuel">Vehicle Fuel</label>
												</div>
																						</div>
										<br>
										<input type='hidden' id='return_grid_fields' name='grid_fields' value='accommodation_name|pickup_time|booking_id|type_name|model_name|car_info|c_notes|status|return_location|download_contract|download_voucher|agent_name|fuel'>
									</br>
									<input type='hidden' id='return_grid_fields_total' name='grid_fields_total' value='accommodation_name|insurance_items|extra_items|return_time|c_departure_flightnumber|pickup_time|booking_id|type_name|pickup_location|model_name|car_info|client|c_notes|status|return_datetime|c_flightnumber|total_price|return_location|download_contract|download_voucher|agent_name|fuel'>
									</br>
										<button class='savereturnfields btn btn-primary btn-outline'>Save</button>
									</div>
								</li>
							</ul>
						</div>
					</div>
                    <div id='return_grid' class="dashboard-grid-content white-bg"></div>
                </div>
            </div>
           
        <div class="dashboard-split-grid m-t-md">
            <div class="grid-wrapper latest_bookings_section" data-action="pjActionGetLatestBookings" data-searchby="latest">
                <div class="grid-heading-wrap">
                    <div>
                        <h3 class="content regular large">New Reservations</h3>
                        <small>
                            Total <strong>0</strong> reservation today                        </small>
                    </div>
                    
                                            <div class="pull-right m-t-md">
                            <a href="/online-admin/index.php?controller=pjAdminBookings&amp;action=pjActionIndex" class="btn btn-primary btn-sm btn-outline m-n">view all</a>
                        </div>
                                    </div>
                <div id='dashboard_grid' class="dashboard-grid-content"></div>
            </div>
		</div>
       <!-- giorgos -->
                <div class="dashboard-split-grid m-t-md">
            <div class="grid-wrapper available_cars_section" data-action="pjActionGetOnRoadVehicles" data-searchby="available">
                <div class="grid-heading-wrap">
                    <h3 class="content regular large">Cars on Road</h3>
                    
                    <div class="filter-dates-wrap">

                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseRentedCars" class="btn btn-sm btn-primary btn-outline">Edit Fields</a>
                    </div>
                </div>
                <div id="collapseRentedCars" class="collapse">
                    <div class="m-b-lg">
                        <ul class="agile-list no-padding">
                            <li class="success-element b-r-sm">
                                <div class="panel-body">
                                                                        

                                    <div id='on_road_cars_sortable_list'>
                                                                                    <div class='sortable_item'>
                                                <input type="checkbox" id="cars-on-road-c_notes" name="o_dashboard_cars_on_road_fields" class='rented-grid-field' value='c_notes'
                                                checked                                                >
                                                <label for="cars-on-road-c_notes">Notes</label>
                                            </div>
                                                                                        <div class='sortable_item'>
                                                <input type="checkbox" id="cars-on-road-booking_id" name="o_dashboard_cars_on_road_fields" class='rented-grid-field' value='booking_id'
                                                checked                                                >
                                                <label for="cars-on-road-booking_id">Reservation ID</label>
                                            </div>
                                                                                        <div class='sortable_item'>
                                                <input type="checkbox" id="cars-on-road-type_name" name="o_dashboard_cars_on_road_fields" class='rented-grid-field' value='type_name'
                                                checked                                                >
                                                <label for="cars-on-road-type_name">Type</label>
                                            </div>
                                                                                        <div class='sortable_item'>
                                                <input type="checkbox" id="cars-on-road-car_info" name="o_dashboard_cars_on_road_fields" class='rented-grid-field' value='car_info'
                                                checked                                                >
                                                <label for="cars-on-road-car_info">Vehicle</label>
                                            </div>
                                                                                        <div class='sortable_item'>
                                                <input type="checkbox" id="cars-on-road-status" name="o_dashboard_cars_on_road_fields" class='rented-grid-field' value='status'
                                                checked                                                >
                                                <label for="cars-on-road-status">Status</label>
                                            </div>
                                                                                        <div class='sortable_item'>
                                                <input type="checkbox" id="cars-on-road-model_name" name="o_dashboard_cars_on_road_fields" class='rented-grid-field' value='model_name'
                                                checked                                                >
                                                <label for="cars-on-road-model_name">Model</label>
                                            </div>
                                                                                        <div class='sortable_item'>
                                                <input type="checkbox" id="cars-on-road-client" name="o_dashboard_cars_on_road_fields" class='rented-grid-field' value='client'
                                                checked                                                >
                                                <label for="cars-on-road-client">Client</label>
                                            </div>
                                                                                        <div class='sortable_item'>
                                                <input type="checkbox" id="cars-on-road-pick_drop" name="o_dashboard_cars_on_road_fields" class='rented-grid-field' value='pick_drop'
                                                                                                >
                                                <label for="cars-on-road-pick_drop">Pick-up / Return</label>
                                            </div>
                                                                                        <div class='sortable_item'>
                                                <input type="checkbox" id="cars-on-road-extra_items" name="o_dashboard_cars_on_road_fields" class='rented-grid-field' value='extra_items'
                                                checked                                                >
                                                <label for="cars-on-road-extra_items">Extras</label>
                                            </div>
                                                                                </div>
                                    <br>
                                        <input type='hidden' id='on_road_cars_fields' name='on_road_cars_fields' value='c_notes|booking_id|type_name|car_info|status|model_name|client|return_datetime|extra_items'>
                                    </br>
                                    <input type='hidden' id='on_road_cars_fields_total' name='on_road_cars_fields_total' value='c_notes|booking_id|type_name|car_info|status|model_name|client|pick_drop|extra_items'>
                                    </br>
                                    <button class='saveonroadfields btn btn-primary btn-outline'>Save</button>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id='total_rent_car' class="dashboard-grid-content white-bg"></div>
                </div>
        
                                    
            <input type="hidden" id="contract_url" value="https://antiparosrentacar.gocars.gr/contracts/Contract-"/>
            <input type="hidden" id="reservation_pdf_url" value="https://antiparosrentacar.gocars.gr/bookings/booking-"/>
                <!-- giorgos -->
    
    <div class="dashboard-split-grid m-t-md">
        <div class="grid-wrapper available_cars_section" data-action="pjActionGetAvailableCars" data-searchby="available">
            <div class="grid-heading-wrap">
                <h3 class="content regular large">Available Cars</h3>
                
                <div class="filter-dates-wrap">
                    <a href="https://antiparosrentacar.gocars.gr/online-admin/app/web/upload/AvailableCars.xlsx" class="btn btn-default" id="download_dashboard_pickup_excel" download>Download Report</a>

                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseEditFieldsAvailableCars" class="btn btn-sm btn-primary btn-outline">Edit Fields</a>
                </div>
            </div>
            <div id="collapseEditFieldsAvailableCars" class="collapse">
                <div class="m-b-lg">
                    <ul class="agile-list no-padding">
                        <li class="success-element b-r-sm">
                            <div class="panel-body">
                                                                <div id='available_cars_sortable_list'>
                                                                            <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-group_name" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='group_name'
                                                                                        >
                                            <label for="available-cars-checkbox-group_name">Group</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-type_name" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='type_name'
                                            checked                                            >
                                            <label for="available-cars-checkbox-type_name">Type</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-model_name" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='model_name'
                                            checked                                            >
                                            <label for="available-cars-checkbox-model_name">Model</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-registration_number" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='registration_number'
                                            checked                                            >
                                            <label for="available-cars-checkbox-registration_number">Registration Number</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-color" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='color'
                                                                                        >
                                            <label for="available-cars-checkbox-color">Color</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-winter_storage" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='winter_storage'
                                                                                        >
                                            <label for="available-cars-checkbox-winter_storage">Winter Storage</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-car_notes" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='car_notes'
                                                                                        >
                                            <label for="available-cars-checkbox-car_notes">Car Notes</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-vehicle_condition" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='vehicle_condition'
                                                                                        >
                                            <label for="available-cars-checkbox-vehicle_condition">Condition</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-vehicle_location" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='vehicle_location'
                                                                                        >
                                            <label for="available-cars-checkbox-vehicle_location">Location</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-mileage" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='mileage'
                                                                                        >
                                            <label for="available-cars-checkbox-mileage">Mileage</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-insurance_expiration" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='insurance_expiration'
                                                                                        >
                                            <label for="available-cars-checkbox-insurance_expiration">Insurance Expiration</label>
                                        </div>
                                                                                <div class='sortable_item'>
                                            <input type="checkbox" id="available-cars-checkbox-ownership" name="dashboard_available_cars_fields" class='available-cars-grid-field' value='ownership'
                                                                                        >
                                            <label for="available-cars-checkbox-ownership">Ownership</label>
                                        </div>
                                                                        </div>
                                <br>
                                <input type='hidden' id='dashboard_available_cars_fields' name='grid_fields' value='type_name|model_name|registration_number'>
                            </br>
                            <input type='hidden' id='dashboard_available_cars_fields_total' name='grid_fields_total' value='group_name|type_name|model_name|registration_number|color|winter_storage|car_notes|model_name|car_info|vehicle_condition|vehicle_location|mileage|insurance_expiration|ownership'>
                            </br>
                                <button class='saveavailablecarsfields btn btn-primary btn-outline'>Save</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id='available_cars_grid' class="dashboard-grid-content"></div>
        </div>
    </div>
</div>


            


<style>
.expired-date{
	color:red;
}
.virtual-item{
	background-color:#FBD8EB!important;
}
.sk-spinner.sk-spinner-double-bounce {
    display: none;
}
.pj-grid {
    background-color: transparent;
}
.pj-grid table, #pickup_grid, #return_grid{
    background-color: #fff;
}
.table-responsive-actions:has( .pj-selector-goto) {
    margin-top: 5px;
}

</style>


<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>

<script type="text/javascript">
var pjGrid = pjGrid || {};
pjGrid.conditions = [];
pjGrid.conditions.push({value: "clean", label: "Clean"},
	{value: "needs_cleaning", label: "Needs Cleaning"},
	{value: "from_dropoff", label: "From Dropoff"},
	{value: "immobilized", label: "Immobilized"},
	{value: "sold", label: "Sold"});var myLabel = myLabel || {};
myLabel.booking_id = "Reservation ID";
myLabel.created = "Created";
myLabel.pick_drop = "Pick-up \/ Return";
myLabel.booking_from = "From";
myLabel.booking_to = "To";
myLabel.booking_type = "Type";
myLabel.booking_model = "Model";
myLabel.booking_car = "Vehicle";
myLabel.booking_total = "Total";
myLabel.booking_client = "Client";
myLabel.delete_selected = "Delete selected";
myLabel.delete_confirmation = "Are you sure you want to delete selected records?";
myLabel.status = "Status";
myLabel.country="Country";
myLabel.pickup_time="Time";
myLabel.return_time="Time";
// myLabel.booking_id="Time";
myLabel.car_info="Car";
myLabel.pickup_location="Pick-up Location";
myLabel.client="Client";
myLabel.car_group="Group";
myLabel.c_flightnumber="Arrival Flight Number";
myLabel.return_datetime="Return";
myLabel.make="Model";
myLabel.model_name="Model";
myLabel.total_price="Total";
myLabel.extra_items="Extras";
myLabel.insurance_items="Insurances";
myLabel.c_notes="Notes";
myLabel.registration_number="Vehicle";
myLabel.c_departure_flightnumber="Departure Flight Number";
myLabel.phone_number="Phone Number";
myLabel.mobile_number="Mobile Number";
myLabel.updated_by_client = "Updated by Client";
myLabel.fuel="Vehicle Fuel";
myLabel.amount_due="Amount Due";
myLabel.c_admin_notes="Admin Notes";
myLabel.return_location="Drop-off Location";
myLabel.download_contract="Download Contract";
myLabel.download_voucher="Download Booking PDF";
myLabel.group_name="Group";
myLabel.type_name="Type";
myLabel.accommodation_name="Local Residence";
myLabel.model_name="Model";
myLabel.color = 'Color';
myLabel.mileage = 'Mileage';
myLabel.winter_storage = 'Winter Storage';
myLabel.car_notes = 'Car Notes';
myLabel.vehicle_condition = 'Condition';
myLabel.vehicle_location = 'Location';
myLabel.insurance_expiration = 'Insurance Expiration';
myLabel.ownership = 'Ownership';
myLabel.agent_name = 'Agent';



myLabel.pending = "Pending";
myLabel.confirmed = "Confirmed";
myLabel.cancelled = "Cancelled";
myLabel.collected = "Collected";
myLabel.completed = null;
myLabel.pending_payment = "Pending Payment";
myLabel.not_available = "Not Available";
myLabel.cancelled_payment = "Payment Cancelled";
myLabel.rented = "On the Road";
myLabel.months = "January_February_March_April_May_June_July_August_September_October_November_December";
myLabel.days = "Su_Mo_Tu_We_Th_Fr_Sa";
myLabel.has_update = 1;
myLabel.has_delete = 1;
myLabel.has_contract = 1;
myLabel.has_delete_bulk = 1;

</script>


<script type="text/javascript">
	$('#pickup_sortable_list').sortable({
        update: function( ) {
            var total_fields='';
            $('.pickup-grid-field').each(function (i, obj) {
                        total_fields= total_fields + $(this).val()+ "|" ;
                });
                total_fields = total_fields.substring(0, total_fields.length - 1);
                $('#pickup_grid_fields_total').val(total_fields);

            var checked_fields='';
            $('.pickup-grid-field').each(function (i, obj) {
                if($(this).is(":checked")){
                    checked_fields= checked_fields + $(this).val()+ "|" ;
                }
            });
            checked_fields = checked_fields.substring(0, checked_fields.length - 1);
            $('#pickup_grid_fields').val(checked_fields);
        }
    });

    $('#return_sortable_list').sortable({
        update: function( ) {
            var total_fields='';
            $('.return-grid-field').each(function (i, obj) {
                        total_fields= total_fields + $(this).val()+ "|" ;
                });
                total_fields = total_fields.substring(0, total_fields.length - 1);
                $('#return_grid_fields_total').val(total_fields);

            var checked_fields='';
            $('.return-grid-field').each(function (i, obj) {
                if($(this).is(":checked")){
                    checked_fields= checked_fields + $(this).val()+ "|" ;
                }
            });
            checked_fields = checked_fields.substring(0, checked_fields.length - 1);
            $('#return_grid_fields').val(checked_fields);
        }
    });

    $('#dashboard_sortable_list').sortable({
        update: function( ) {
            var total_fields='';
            $('.dashboard-grid-field').each(function (i, obj) {
                        total_fields= total_fields + $(this).val()+ "|" ;
                });
                total_fields = total_fields.substring(0, total_fields.length - 1);
                $('#dasboard_grid_fields_total').val(total_fields);

            var checked_fields='';
            $('.dashboard-grid-field').each(function (i, obj) {
                if($(this).is(":checked")){
                    checked_fields= checked_fields + $(this).val()+ "|" ;
                }
            });
            checked_fields = checked_fields.substring(0, checked_fields.length - 1);
            $('#dashboard_grid_fields').val(checked_fields);
        }
    });

    $('#available_cars_sortable_list').sortable({
        update: function( ) {
            var total_fields='';
            $('.available-cars-grid-field').each(function (i, obj) {
                        total_fields= total_fields + $(this).val()+ "|" ;
                });
                total_fields = total_fields.substring(0, total_fields.length - 1);
                $('#dashboard_available_cars_fields_total').val(total_fields);

            var checked_fields='';
            $('.available-cars-grid-field').each(function (i, obj) {
                if($(this).is(":checked")){
                    checked_fields= checked_fields + $(this).val()+ "|" ;
                }
            });
            checked_fields = checked_fields.substring(0, checked_fields.length - 1);
            $('#dashboard_available_cars_fields').val(checked_fields);
        }
    });

    $('#on_road_cars_sortable_list').sortable({
        update: function( ) {
            var total_fields='';
            $('.rented-grid-field').each(function (i, obj) {
                        total_fields= total_fields + $(this).val()+ "|" ;
                });
                total_fields = total_fields.substring(0, total_fields.length - 1);
                $('#on_road_cars_fields_total').val(total_fields);
            var checked_fields='';
            $('.rented-grid-field').each(function (i, obj) {
                if($(this).is(":checked")){
                    checked_fields= checked_fields + $(this).val()+ "|" ;
                }
            });
            checked_fields = checked_fields.substring(0, checked_fields.length - 1);
            $('#on_road_cars_fields').val(checked_fields);
        }
    });

</script>

     		</div>
		</div><!-- #wrapper -->



		
		
				
					<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
		
					<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/jquery-toast/dist/jquery.toast.min.js?v=1760642127"></script>
					
		
		
		
		
		
		<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/jquery/3.1.1/jquery.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/plugins/pjBase/web/js/pjBaseCore.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/metis_menu/2.0.2/jquery.metisMenu.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/slimscroll/1.0.0/jquery.slimscroll.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/validate/1.15.1/jquery.validate.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/gritter/1.7.4/jquery.gritter.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/sparkline/2.1.2/jquery.sparkline.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/toastr/2.1.0/toastr.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/icheck/1.0.2/icheck.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/ladda/1.0.0/spin.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/ladda/1.0.0/ladda.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/ladda/1.0.0/ladda.jquery.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/sweetalert/1.0.0/sweetalert.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/pace/1.0.2/pace.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/touchspin/3.0.1/jquery.bootstrap-touchspin.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/app/web/js/pjAdminCore.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/app/web/js/pjAdmin.js?v=202510161015"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/plugins/pjBase/web/js/pjBaseOptions.js?v=202510161015"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/moment/2.10.6/moment-with-locales.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/core/framework/libs/pj/js/jquery.datagrid.js?v=202510161015"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/jasny/3.1.2/jasny-bootstrap.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/select2/4.0.3/js/select2.full.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/core/framework/libs/pj/js/jquery.multilang.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/validate/1.15.1/jquery.validate.min.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/third-party/validate/1.15.1/additional-methods.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/app/web/js/pjAdminOptions.js?202510161015"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/plugins/pjBase/web/js/inspinia.js"></script>
	<script src="https://antiparosrentacar.gocars.gr/online-admin/index.php?controller=pjBase&action=pjActionMessages"></script>
				<script src="https://antiparosrentacar.gocars.gr/online-admin/app/web/js/generalBackoffice.js?v=1760642127"></script>		
				<div class="modal fade" id="changeLogModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  	<div class="modal-dialog modal-lg" role="document">
	    <div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h2 class="modal-title">Changelog</h2>
			</div>
			<div id="changeLogContentWrapper" class="modal-body" style="overflow: auto;max-height: 80vh;">
                <div  id="changelog" class="changelog-content" data-version="1.0.1">
<h3>10/12/2025</h3>
<ul>
    <li> test </li>
</ul>
    
    <h3>04/09/2025</h3>
    <ul>
        <li>Ενημέρωση ρύθμισης Mobile Checkin για άμεση επεξεργασία της κράτησης, υλικού, ψηφιακού πελάτη, συμβολαίου κ.α. από το κινητές συσκευές</li>
    </ul>

    <h3>01/09/2025</h3>
    <ul>
        <li>Διόρθωση στοιχείων και αυτόματης συμπλήρωσαης Μ.ΑΡ.Κ. στο Ψηφιακό Πελατολόγιο</li>
    </ul>
    
    <h3>22/08/2025</h3>
    <ul>
        <li>Προσθήκη Ενότητας και Λίστας Κρατήσεων στη Σελίδα κάθε Οχήματος</li>
    </ul>
    
    <h3>21/08/2025</h3>
    <ul>
        <li>Διορθώσεις στους Όρους και Προϋποθέσεις του Συμβολαίου, στην εμφάνιση του Οχημάτων που χρειάζονται ΚΤΕΟ.</li>
        <li>Προσθήκη πεδίου <a href="index.php?controller=pjAdminInvoices&action=pjActionCreate">Επιλογής τρόπου τιμολόγησης</a> για τα Παραστατικά. (Βάση κράτησης, πληρωμών)</li>
    </ul>
    <h3>19/08/2025</h3>
    <ul>
        <li>Προσθήκη στοιχείων και υπογραφή χρήστη στο PDF των Συμβολαίων.</li>
        <li>Προσθήκη token για την ημερομηνία λήξης του αυτόματου κουπονιού.</li>
    </ul>

    <h3>14/08/2025</h3>
    <ul>
        <li>Προσθήκη πληροφοριών οχήματος στα PDF των Παραστατικών</li>
        <li>Προσθήκη πεδίου <a href="index.php?controller=pjBaseUsers&action=pjActionProfile&tab=1">Υπογραφής στο Προφίλ του χρήστη</a></li>
    </ul>

    <h3>13/08/2025</h3>
    <ul>
        <li>Δημιουργία πεδίου για πολλαπλή επιλογή κρατήσεων για <a href="index.php?controller=pjAdminInvoices&action=pjActionCreate">τα Παραστατικά</a></li>
    </ul>

    <h3>12/08/2025</h3>
    <ul>
        <li>Προσθήκη λειτουργίας αλλαγής κατάστασης κράτησης από το <a href="index.php?controller=pjAdminBookingCalendar&action=pjActionIndex">Ημερολόγιο (Calendar)</a></li>
    </ul>

    <h3>11/08/2025</h3>
    <ul>
        <li>Διόρθωση λάθους υπολογισμού του ποσού Payment Method Discount στο Περιβάλλον του Πελάτη (User Area)</li>
        <li>Προσθήκη ρύθμισης για προβολή σημειώσεων ανά κράτηση/email πελάτη στο Dashboard και στο Reservations</li>
    </ul>

    <h3>08/08/2025</h3>
    <ul>
        <li>Προσθήκη πεδίου <a href="index.php?controller=pjAdminOptions&action=pjActionMyDataSettings">Προεπιλογής Τύπου Παραστατικού</a> για το Ψηφιακό Πελατολόγιο</li>
        <li>Προσθήκη πεδίου <a href="index.php?controller=pjAdminOptions&action=pjActionMyDataSettings">Αριθμού ΦΗΜ Ταμειακής Μηχανής</a></li>
        <li>Προσθήκη πεδίου αναζήτησης <a href="index.php?controller=pjAdminBookings&action=pjActionIndex">Πληρωμών στη Σύνθετη Αναζήτηση</a></li>
        <li> Ενημέρωση σελίδας του ΚΤΕΟ <a href="index.php?controller=pjAdminFleetInfo&action=pjActionVehicleKteo"> εμφανίζονται μόνο τα οχήματα που έχουν ενεργό το ΚΤΕΟ </a></li>
    </ul>

    <h3>06/08/2025</h3>
    <ul>
        <li>Προσθήκη πεδίου <a href="index.php?controller=pjAdminReservationProcess&action=pjActionCheckoutFormInfo">Ύψος στην φόρμα Checkout</a></li>
    </ul>

    <h3>04/08/2025</h3>
    <ul>
        <li>Διόρθωση ποσού των συνεργατών στα Reports</li>
    </ul>

    <h3>31/07/2025</h3>
    <ul>
        <li>
            Ενημέρωση σελίδας <a href="index.php?controller=pjAdminCustomers&action=pjActionIndex">Εγγεγραμμένου Πελατή</a> και <a href="index.php?controller=pjAdminUnregisteredCustomers&action=pjActionIndex">μη Εγγεγραμμένου Πελατή</a>
            <ul>
                <li>Προσθήκη καρτέλας Κρατήσεων</li>
                <li>Προσθήκη καρτέλας Παραστατικών</li>
                <li>Προσθήκη καρτέλας Πληρωμών</li>
            </ul>
        </li>
    </ul>
</div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("changelog");
  const entries = Array.from(container.children); // Παίρνουμε όλα τα άμεσα παιδιά (h3, ul, div)
  const grouped = {};

  // Loop για να βρούμε ημερομηνίες και τις αλλαγές τους
  for (let i = 0; i < entries.length; i++) {
    if (entries[i].tagName === "H3") {
      const currentDate = entries[i].textContent.trim();
      let [day, month, year] = currentDate.split("/");
      let key = `${year}-${month}`;
      if (!grouped[key]) grouped[key] = [];

      // Παίρνουμε το h3
      grouped[key].push(entries[i]);

      // Μαζεύουμε όλα τα ul μέχρι να βρούμε το επόμενο h3 ή να τελειώσει η λίστα
      let j = i + 1;
      while (j < entries.length && entries[j].tagName !== "H3") {
        if (entries[j].tagName === "UL") {
          grouped[key].push(entries[j]);
        }
        j++;
      }
    }
  }

  // Καθαρίζουμε το container
  container.innerHTML = "";

  // Ονόματα μηνών
  const months = {
    "01":"Ιανουάριος","02":"Φεβρουάριος","03":"Μάρτιος","04":"Απρίλιος",
    "05":"Μάιος","06":"Ιούνιος","07":"Ιούλιος","08":"Αύγουστος",
    "09":"Σεπτέμβριος","10":"Οκτώβριος","11":"Νοέμβριος","12":"Δεκέμβριος"
  };

  // Φτιάχνουμε sections ανά μήνα
  Object.keys(grouped).sort().reverse().forEach((key, index, arr) => {
    const [year, month] = key.split("-");
    const section = document.createElement("div");

    // Τίτλος μήνα
    section.innerHTML = `<h2>${months[month]} ${year}</h2>`;

    // Γραμμή κάτω από τον τίτλο
    const hr = document.createElement("div");
    hr.className = "hr-line-dashed";
    section.appendChild(hr);

    // Προσθέτουμε όλες τις ημερομηνίες + λίστες του μήνα
    grouped[key].forEach(el => section.appendChild(el));

    container.appendChild(section);

    // Γραμμή ανάμεσα στους μήνες (εκτός από τον τελευταίο)
    if (index < arr.length - 1) {
      const hrBetween = document.createElement("div");
      hrBetween.className = "hr-line-dashed";
      container.appendChild(hrBetween);
    }
  });
});
</script>
 
			</div>
	    </div><!-- /.modal-content -->
  	</div><!-- /.modal-dialog -->
</div><!-- /.modal -->


	</body>
</html>
