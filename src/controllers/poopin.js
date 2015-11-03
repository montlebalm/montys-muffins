module.exports = function(request, reply) {
  var user = request.payload.user_name;
  reply({
    response_type: 'in_channel',
    text: user + ' is poopin',
    attachments: [],
  });
};
