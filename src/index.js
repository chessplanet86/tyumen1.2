const app = new Vue({
    el: '#app',
    data() {
        return {
            arrayInitial: [
                { id: 1, name: "Вася", date: "15.06.2018", count: 11 },
                { id: 2, name: "Петя", date: "23.11.2018", count: 23 },
                { id: 3, name: "Иван", date: "12 марта 2017", count: 3 },
                { id: 4, name: "Александр", date: "20/12/2010", count: 1 },
                { id: 5, name: "Евгений", date: "12.09.2018", count: 112 },
                { id: 6, name: "Мария", date: "1.08.2016", count: 122 },
                { id: 7, name: "Анастасия", date: "20.11.2018", count: 34 },
                { id: 8, name: "Степан", date: "12.11.2019", count: 10 },
            ],
            dataColumns: null,
            cellsTd: null,
            cellsTh: null,
            chooseColumn: null,
            array: null,
            search: null,
            numberColumn: null,
            evt: null,
        }
    },
    created() {
        this.array = [].concat(this.arrayInitial);
    },
    computed: {
        searchCoincidence() {


        },
    },
    watch: {
        search() {
            let regExp = new RegExp(this.search);

            if (this.chooseColumn != null && this.search != null) {
                this.array.length = 0;
                let length = this.arrayInitial.length;
                for (let i = 0; i < length; i++) {
                    if (regExp.test(this.arrayInitial[i][this.chooseColumn])) {
                        this.array.push(this.arrayInitial[i]);
                    }
                }
            }
        }
    },
    mounted() {
        this.dataColumns = document.querySelector('tbody').querySelectorAll('tr');
        this.cellsTd = document.querySelectorAll('td');
        this.cellsTh = document.querySelectorAll('th');
        this.parseDate();

    },
    methods: {
        test() {
            if (this.chooseColumn != null) {
                this.clearCellTd();
                let data = document.querySelector('tbody').querySelectorAll('tr');
                let length = data.length;

                console.log(length);
                for (let i = 0; i < length; i++) {
                    data[i].querySelectorAll('td')[this.numberColumn].style.backgroundColor = "lightblue";
                }
            }

        },
        choose(numberColumn, event) {
            this.clearCellTh(); // очищаем все ячейки заголовков от выделения
            this.clearCellTd(); // очищаем все ячейки кортежей от выделения
            this.numberColumn = numberColumn;
            let dataColumns = document.querySelector('tbody').querySelectorAll('tr');
            this.evt = event;
            let cortegeNumbers = dataColumns.length;
            this.chooseColumn = event.target.innerText;
            event.target.style.backgroundColor = "lightgray";
            for (let i = 0; i < cortegeNumbers; i++) {
                dataColumns[i].querySelectorAll('td')[numberColumn].style.backgroundColor = "lightblue";
            }
        },
        clearCellTh() {
            let cellsTh = document.querySelectorAll('th');
            let cellsThLength = cellsTh.length;
            for (let i = 0; i < cellsThLength; i++) {
                cellsTh[i].style.backgroundColor = null;
            }
        },
        clearCellTd() {
            let cellsTd = document.querySelectorAll('td');
            let cellsTdLength = cellsTd.length;
            for (let i = 0; i < cellsTdLength; i++) {
                cellsTd[i].style.backgroundColor = null;
            }
        },
        sortAscOrder() {
            this.array.sort((a, b) => {
                if (this.chooseColumn == 'id' || this.chooseColumn == 'count') {
                    return b[this.chooseColumn] - a[this.chooseColumn];
                } else if (this.chooseColumn == 'name') {
                    let nameA = a[this.chooseColumn].toLowerCase();
                    let nameB = b[this.chooseColumn].toLowerCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA == nameB) {
                        return 0;
                    }

                    if (nameA > nameB) {
                        return 1;
                    }
                } else if (this.chooseColumn == 'date') {
                    let dateA = a[this.chooseColumn].split('').reverse().join('');
                    let dateB = b[this.chooseColumn].split('').reverse().join('');
                    if (dateA < dateB) {
                        return -1;
                    }
                    if (dateA == dateB) {
                        return 0;
                    }

                    if (dateA > dateB) {
                        return 1;
                    }
                }

            })
        },
        sortDescOrder() {
            this.array.sort((a, b) => {
                if (this.chooseColumn == 'id' || this.chooseColumn == 'count') {
                    return a[this.chooseColumn] - b[this.chooseColumn];
                } else if (this.chooseColumn == 'name') {
                    let nameA = a[this.chooseColumn].toLowerCase();
                    let nameB = b[this.chooseColumn].toLowerCase();

                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA == nameB) {
                        return 0;
                    }

                    if (nameA < nameB) {
                        return 1;
                    }
                } else if (this.chooseColumn == 'date') {
                    let dateA = a[this.chooseColumn].split('').reverse().join('');
                    let dateB = b[this.chooseColumn].split('').reverse().join('');
                    if (dateA > dateB) {
                        return -1;
                    }
                    if (dateA == dateB) {
                        return 0;
                    }

                    if (dateA < dateB) {
                        return 1;
                    }
                }

            })
        },
        reset() {
            this.clearCellTh();
            this.clearCellTd();
            this.chooseColumn = null;
            this.array = [].concat(this.arrayInitial);
            this.search = null;
        },
        parseDate() {
            let re = /\//g;
            let jan = /января/i;
            let feb = /февраля/i;
            let mar = /марта/i;
            let apr = /апреля/i;
            let may = /мая/i;
            let jun = /июня/i;
            let jul = /июля/i;
            let aug = /августа/i;
            let sept = /сентября/i;
            let oct = /октября/i;
            let nov = /ноября/i;
            let dec = /декабря/i;
            let space = /\s/g;

            let length = this.array.length;
            for (let i = 0; i < length; i++) {
                this.array[i]['date'] = this.array[i]['date'].replace(re, '.');
                this.array[i]['date'] = this.array[i]['date'].replace(jan, '.01.');
                this.array[i]['date'] = this.array[i]['date'].replace(feb, '.02.');
                this.array[i]['date'] = this.array[i]['date'].replace(mar, '.03.');
                this.array[i]['date'] = this.array[i]['date'].replace(apr, '.04.');
                this.array[i]['date'] = this.array[i]['date'].replace(may, '.05.');
                this.array[i]['date'] = this.array[i]['date'].replace(jun, '.06.');
                this.array[i]['date'] = this.array[i]['date'].replace(jul, '.07.');
                this.array[i]['date'] = this.array[i]['date'].replace(aug, '.08.');
                this.array[i]['date'] = this.array[i]['date'].replace(sept, '.09.');
                this.array[i]['date'] = this.array[i]['date'].replace(oct, '.10.');
                this.array[i]['date'] = this.array[i]['date'].replace(nov, '.11.');
                this.array[i]['date'] = this.array[i]['date'].replace(dec, '.12.');
                this.array[i]['date'] = this.array[i]['date'].replace(space, '');
            }
        }
    }
})