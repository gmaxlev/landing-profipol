/* 
  Глобальные контрольные точки медиазпросов
*/
window._breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200
};

/**
 * Модальные окна
 */
(function() {
  /**
   * Конструктор
   *
   * @param {*} id DOM id
   */
  function ModalWindow(id) {
    var node = $("#" + id);
    var that = this;
    var animate = false;
    isShow = false;
    ModalWindow.list[id] = this;

    /**
     * Открыть окно
     */
    this.close = function() {
      if (animate || isShow === false) return;
      animate = true;
      $(node).removeClass("modal_show");
      $(node).addClass("modal_hide");
      isShow = false;
      ModalWindow.isShow = false;
      setTimeout(function() {
        $(node).removeClass("modal_hide");
        animate = false;
        $("body, html").css("overflow", "auto");
      }, 1000);
    };

    /**
     * Закрыть окно
     */
    this.show = function() {
      if (animate || ModalWindow.isShow) return;
      $("body, html").css("overflow", "hidden");
      animate = true;
      $(node).addClass("modal_show");
      isShow = true;
      ModalWindow.isShow = true;
      setTimeout(function() {
        animate = false;
      }, 1000);
    };

    $(node).on("click", function(e) {
      var modal = $(e.target);
      if (modal.hasClass("modal")) {
        that.close();
      }
    });

    $(node)
      .find("[data-modal-close]")
      .on("click", function() {
        that.close();
      });
  }

  // открыто любое окно
  ModalWindow.isShow = false;
  // список окон
  ModalWindow.list = {};
  // глобальный объект
  window.ModalWindow = ModalWindow;

  /**
   * Открыть окно
   *
   * @param {*} id DOM id
   */
  ModalWindow.show = function(id) {
    this.list[id].show();
  };

  /**
   * Атрибут data-modal="id" открывать окно
   */
  $("[data-modal]").on("click", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-modal");
    ModalWindow.show(id);
  });

  /**
   * Атрибут data-is-modal обозначает окно
   */
  $("[data-is-modal]").each(function(index, element) {
    new ModalWindow($(element).attr("id"));
  });
})();

$(document).ready(function() {
  /**
   * Анимации
   */
  (function() {
    new WOW().init();
  })();

  /**
   * Валидация форм
   */
  (function() {
    /**
     * Удаляет пробелы с концов строк
     */
    function trimString() {
      $(this).val($.trim($(this).val()));
      return true;
    }

    $('[data-form-type="1"]').each(function(index, element) {
      $(element).validate({
        errorClass: "input-form-error",
        rules: {
          name: {
            required: {
              depends: trimString
            }
          },
          phone: {
            required: {
              depends: trimString
            },
            minlength: 19
          },
          email: {
            required: {
              depends: trimString
            },
            email: true
          }
        },
        messages: {
          name: "Введите своё имя",
          phone: "Введите номер телефона",
          email: "Введите e-mail"
        },
        errorElement: "div",
        errorPlacement: function(error, element) {
          $(element)
            .parent()
            .before(error);
        }
      });
    });
  })();

  /**
   * Обработчик отправки формы
   */
  (function() {
    $('[data-form-type="1"]').each(function(index, form) {
      $(this).on("submit", function(event) {
        event.preventDefault();
        if (!$(this).valid()) return;

        function formDisable(status) {
          $(form)
            .find("button")
            .attr("disabled", status);
          $(form)
            .find("input")
            .attr("disabled", status);
        }

        function successParam(param) {
          $(form)
            .find(".form-send-success__params")
            .append(
              '<div class="form-send-success__param">' + param + "</div>"
            );
        }

        var data = new FormData(this);
        formDisable(true);

        $(form)
          .find(".form-send-error")
          .removeClass("form-send-error_show");

        data.append("form", $(this).attr("name"));

        axios({
          method: "post",
          url: "send.php",
          data: data
        })
          // запрос выполнен
          .then(function() {
            successParam(data.get("name"));
            successParam(data.get("phone"));
            successParam(data.get("email"));

            if (name !== null) {
              $(form)
                .find(".form-send-success__name")
                .text(", " + name);
            }
            $(form)
              .find(".form-send-error")
              .removeClass("form-send-error_show");
            $(form)
              .find(".form-send-success")
              .addClass("form-send-success_show");
          })
          // запрос не выполнен
          .catch(function(error) {
            $(form)
              .find(".form-send-error")
              .addClass("form-send-error_show");
            $(form)
              .find(".form-send-error__text")
              .text(error.message);
            formDisable(false);
          });
      });
    });
  })();

  /**
   * Маска для номера телефона
   */
  (function() {
    $(".phone-mask").mask("+38 (099) 999 99 99", {
      placeholder: "+38 (___) ___ __ __"
    });
  })();

  (function() {
    var mySwiper = new Swiper("#slider-objects", {
      loop: true,
      spaceBetween: 50,
      navigation: {
        nextEl: "#slider-objects-next",
        prevEl: "#slider-objects-prev"
      }
    });
  })();

  (function() {
    new Swiper("#slider-faq", {
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: "row",
      spaceBetween: 30,
      navigation: {
        nextEl: "#slider-faq-next",
        prevEl: "#slider-faq-prev"
      },
      breakpoints: {
        [_breakpoints["lg"]]: {
          slidesPerView: 3
        },
        [_breakpoints["sm"]]: {
          slidesPerView: 2,
          slidesPerColumn: 2
        }
      }
    });
  })();

  (function() {
    new Swiper("#slider-we", {
      effect: "fade",
      watchOverflow: true,
      fadeEffect: {
        crossFade: true
      },
      navigation: {
        nextEl: "#slider-we-next",
        prevEl: "#slider-we-prev"
      }
    });
  })();
});
