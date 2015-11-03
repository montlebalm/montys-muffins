module.exports = function(request, reply) {
  var user = request.payload.user_name;
  reply(user + ' is poopin');
};
