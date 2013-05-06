App = Ember.Application.create();

App.Store = DS.Store.extend({
  revision: 12,
  adapter: 'DS.FixtureAdapter'
});

App.ViewTest = DS.Model.extend({
  subView: DS.attr('string'),

  subViewClassName: function() {
    var str = this.get('subView');
    var f = str.charAt(0).toUpperCase();
    str = f + str.substr(1);
    return 'App.' + str + 'View';
  }.property('subView'),

  subViewClass: function() {
    var str = this.get('subView');
    var f = str.charAt(0).toUpperCase();
    str = f + str.substr(1) + 'View';
    return App[str];
  }.property('subViewClassName')
});

App.ViewTest.FIXTURES = [
  {id: 1, subView: 'sub1'},
  {id: 2, subView: 'sub2'},
  {id: 3, subView: 'sub3'}
];

App.Sub1View = Ember.View.extend({
  templateName: 'sub1'
});

App.Sub2View = Ember.View.extend({
  templateName: 'sub2'
});

App.Sub3View = Ember.View.extend({
  templateName: 'sub3'
});


App.Router.map(function() {
  // put your routes here
  this.resource('index', { path: '/' });
  this.resource('index', { path: '/:view_test_id' });
});

App.IndexRoute = Ember.Route.extend({
  model: function(params) {
    if (! params.view_test_id) {
      params.view_test_id = 1;
    }
    return App.ViewTest.find(params.view_test_id);
  }
});
