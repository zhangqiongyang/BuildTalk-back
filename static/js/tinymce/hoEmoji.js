!(function () {
  'use strict'
  var inv_thisJsPath = document.scripts[document.scripts.length - 1].src,
    inv_thisJsBasePath = inv_thisJsPath.substring(0, inv_thisJsPath.lastIndexOf('/') + 1)
  var baseUrl = window.location.origin
  var emojiData = ['bowtie', 'smile', 'laughing', 'blush', 'smiley', 'relaxed', 'smirk', 'heart_eyes', 'kissing_heart', 'kissing_closed_eyes', 'flushed', 'relieved', 'satisfied', 'grin', 'wink', 'stuck_out_tongue_winking_eye', 'stuck_out_tongue_closed_eyes', 'grinning', 'kissing', 'kissing_smiling_eyes', 'stuck_out_tongue', 'sleeping', 'worried', 'frowning', 'anguished', 'open_mouth', 'grimacing', 'confused', 'hushed', 'expressionless', 'unamused', 'sweat_smile', 'sweat', 'disappointed_relieved', 'weary', 'pensive', 'disappointed', 'confounded', 'fearful', 'cold_sweat', 'persevere', 'cry', 'sob', 'joy', 'astonished', 'scream', 'neckbeard', 'tired_face', 'angry', 'rage', 'triumph', 'sleepy', 'yum', 'mask', 'sunglasses', 'dizzy_face', 'imp', 'smiling_imp', 'neutral_face', 'no_mouth', 'innocent', 'alien', 'yellow_heart', 'blue_heart', 'purple_heart', 'heart', 'green_heart', 'broken_heart', 'heartbeat', 'heartpulse', 'two_hearts', 'revolving_hearts', 'cupid', 'sparkling_heart', 'sparkles', 'star', 'star2', 'dizzy', 'boom', 'collision', 'anger', 'exclamation', 'question', 'grey_exclamation', 'grey_question', 'zzz', 'dash', 'sweat_drops', 'notes', 'musical_note', 'fire', 'shit', 'thumbsup', 'thumbsdown', 'ok_hand', 'punch', 'facepunch', 'fist', 'v', 'wave', 'hand', 'raised_hand', 'open_hands', 'point_up', 'point_down', 'point_left', 'point_right', 'raised_hands', 'pray', 'point_up_2', 'clap', 'muscle', 'metal', 'fu', 'runner', 'running', 'couple', 'family', 'two_men_holding_hands', 'two_women_holding_hands', 'dancer', 'dancers', 'ok_woman', 'no_good', 'information_desk_person', 'raising_hand', 'bride_with_veil', 'person_with_pouting_face', 'person_frowning', 'bow', 'couplekiss', 'couple_with_heart', 'massage', 'haircut', 'nail_care', 'boy', 'girl', 'woman', 'man', 'baby', 'older_woman', 'older_man', 'person_with_blond_hair', 'man_with_gua_pi_mao', 'man_with_turban', 'construction_worker', 'cop', 'angel', 'princess', 'smiley_cat', 'smile_cat', 'heart_eyes_cat', 'kissing_cat', 'smirk_cat', 'scream_cat', 'crying_cat_face', 'joy_cat', 'pouting_cat', 'japanese_ogre', 'japanese_goblin', 'see_no_evil', 'hear_no_evil', 'speak_no_evil', 'guardsman', 'skull', 'feet', 'lips', 'kiss', 'droplet', 'ear', 'eyes', 'nose', 'tongue', 'love_letter', 'bust_in_silhouette', 'busts_in_silhouette', 'speech_balloon', 'thought_balloon', 'feelsgood', 'finnadie', 'goberserk', 'godmode', 'hurtrealbad', 'rage1', 'rage2', 'rage3', 'rage4', 'suspect', 'trollface'],
    arr = [],
    ar = [],
    cunt = 18 // 每行显示个数
  for (var ei = 0; ei < emojiData.length; ei++) {
    ar.push(emojiData[ei])
    if ((ei + 1) % cunt == 0) {
      arr.push(ar)
      ar = []
    }
  }
  var t = tinymce.util.Tools.resolve('tinymce.PluginManager'),
    e = tinymce.util.Tools.resolve('tinymce.util.Tools'),
    n = arr,
    i = function (i) {
      var o
      return o = '<table role="list" class="mce-grid">',
      e.each(n, function (t) {
        o += '<tr>',
        e.each(t, function (t) {
          var e = baseUrl + '/static/js/tinymce/emoji/' + t + '.png'
          o += '<td><a href="#" data-mce-url="' + e + '" data-mce-alt="' + t + '" tabindex="-1" role="option" aria-label="' + t + '"><img src="' + e + '" style="width: 24px; height: 24px" role="presentation" /></a></td>'
        }),
        o += '</tr>'
      }),
      o += '</table>'
    },
    o = function (a, t) {
      var e = i(t)
      a.addButton('hoEmoji', {
        type: 'panelbutton',
        /* text: '表情', */
        icon: 'emoticons',
        panel: {
          role: 'application',
          autohide: !0,
          html: e,
          onclick: function (t) {
            var e, i, o, n = a.dom.getParent(t.target, 'a')
            n && (e = a,
            i = n.getAttribute('data-mce-url'),
            o = n.getAttribute('data-mce-alt'),
            e.insertContent(e.dom.createHTML('img', {
              src: i,
              alt: o,
              width: '24px',
              height: '24px'
            })),
            this.hide())
          }
        },
        tooltip: '表情'
      })
    }
  t.add('hoEmoji', function (t, e) {
    o(t, e)
  })
}())
