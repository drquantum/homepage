var keystone = require('keystone'),
	Enquiry = keystone.list('Enquiry');


exports = module.exports = function(req,res) {
	var view = new keystone.View(req,res),
		locals = res.locals;

	locals.section = 'contact';
	locals.lang = req.params.lng || 'fr';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	view.on('post', {action: 'contact'}, function(next) {
		var application = new Enquiry.model(),
			updater = application.getUpdateHandler(req);
			updater.options.errorMessage = 'Oops!';
		updater.process(req.body, {
			flashErrors: true
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
				console.log(err);
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});
	view.render('contact', {section: 'contact'});
}
