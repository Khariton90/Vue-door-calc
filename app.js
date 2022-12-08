Vue.use(window.vuelidate.default);
Vue.use(validators)

const { required, maxLength, minLength, between } = validators;

const JAMB = {
  DEFAULT: 'DEFAULT',
  TELESCOPE: 'TELESCOPE'
}

const app = new Vue({
  el: '#app',
  data: {
    form: {
      door: {
        width: '',
        height: '',
        depth: ''
      },
      doorone: {
        width: '',
        height: '',
        depth: '',
      }
    },
    jamb: JAMB.DEFAULT,
    planc: ''
  },
  methods: {
    print() {
      window.print();
    }
  },
  computed: {
    getWidthValid() {
      if (!this.$v.form.door.width.$invalid && !this.$v.form.doorone.width.$invalid) {
        return true;
      }

      return false;
    },
    getHeightValid() {
      if (!this.$v.form.door.height.$invalid && !this.$v.form.doorone.height.$invalid) {
        return true;
      }

      return false;
    },
    getSideExtention() {
      const extention = this.form.doorone.width - this.form.door.width;

      if (this.getWidthValid && extention < 20) {
        return extention || true;
      }

      return null;
    },
    getTopExtention() {
      const extention = this.form.doorone.height - this.form.door.height;

      if (this.getHeightValid && extention < 10) {
        return extention || true;
      }

      return null;
    },
    getSideNarrow() {
      const narrow = this.form.doorone.width - this.form.door.width;

      if (this.getWidthValid && narrow > 60) {
        return true;
      }

      return null;
    },
    getTopNarrow() {
      const narrow = this.form.doorone.height - this.form.door.height;

      if (this.getHeightValid && narrow > 30) {
        return true;
      }

      return null;
    },
    getJamb() {
      const divergence = this.form.doorone.depth - this.form.door.depth;

      if (divergence > 0) {
        return divergence;
      }

      return false;
    },
    getJambRepair() {
      if (this.getJamb && this.jamb === JAMB.DEFAULT ) {
        return this.getJamb > 2 ? this.getJamb : false;
      }

      if (this.getJamb && this.jamb === JAMB.TELESCOPE ) {
        return this.getJamb > 15 ? this.getJamb : false;
      }
    },
    getCuttJamb() {
      const divergence = this.planc * this.getJambCount;

      if (this.getJambCount && this.getJambRepair) {
        return divergence - this.getJamb !== 2;
      }
      return false;
    },
    getJambCount() {
      if (this.planc) {
        return Math.ceil((this.getJamb + 2) / this.planc);
      }

      return false;
    }
  },
  validations() {
    return {
      form: {
        door: {
          width: {
            required,
            between: between(620, 1480)
          },
          height: {
            required,
            between: between(2020, 2100)
          },
          depth: {
            required,
            between: between(68, 80)
          }
        },
        doorone: {
          width: {
            required,
            between: between(600, 1500)
          },
          height: {
            required,
            between: between(2000, 2130)
          },
          depth: {
            required,
            between: between(68, 450)
          }
        }
      }
    }
  },
})