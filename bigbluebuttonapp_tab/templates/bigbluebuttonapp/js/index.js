"use strict";
import 'alpinejs';
import axiosImported from 'axios';

function BBBIntegration() {
    return {
        version: 'v1.0.1',
        course_id: null,
        user_id: null,
        user_name: null,
        isStaff: false,
        meetings: null,
        allRecords: null,
        hasRecords: false,
        selectedMeeting: null,
        newMeetingBox: false,
        showModal: false,
        removeRecordModal: false,
        feedbackMessage: null,
        createFormErrorMsg: null,
        loading: true,
        axios: null,

        init(course_id = '', serverUrl = '') {
            console.log('MeetingsApp - Version: ' + this.version + ' (BigBlueButton Integration for GraspWay)')
            this.course_id = course_id;

            this.axios = axiosImported.create({
                baseURL: serverUrl + '/api/meetings',
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            this.axios.interceptors.request.use(
                config => {
                    this.loading = true;
                    console.log(`${config.method} ${config.url}`);
                    return config;
                });
            this.axios.interceptors.response.use(
                res => {
                    console.dir(res.data);
                    this.loading = false;
                    return res;
                },
                error => {
                    this.feedbackMessage = error;
                    (error.response.status == 401) ? this.feedbackMessage = 'No autorizado': false;
                    this.createFormErrorMsg = error;
                    this.loading = false;
                    return Promise.reject(error)
                });

            this.getMeetings();
        },
        getMeetings() {

            this.axios.get(this.course_id).then(response => {
                if (response.data.error) {
                    console.dir(response.data.error);
                    this.feedbackMessage = response.data.error;
                    return;
                }

                if (response.data.course_id) {
                    this.feedbackMessage = response.data.course_id;
                    return;
                }

                this.feedbackMessage = (response.data.meetings.length == 0) ? 'No hay videoconferencias' : null;
                this.meetings = (response.data.meetings.length > 0) ? response.data.meetings : false;
                this.allRecords = (response.data.allRecords.length > 0) ? response.data.allRecords : false;
                this.hasRecords = response.data.hasRecords;
                this.fullName = response.data.fullName;
                this.user_id = response.data.user_id;
                this.isStaff = response.data.isStaff;
                console.log('User FullName: ' + this.fullName)
                console.log('User ID: ' + this.user_id)
            })
        },
        createMeetingBox() {
            this.newMeetingBox = !this.newMeetingBox
        },
        createMeeting() {
            console.log('create meeting');

            if (this.$refs.meetingName.value == '') {
                this.createFormErrorMsg = 'Inserte un nombre de la Videoconferencia.'
                this.$refs.meetingName.focus();
                return;
            }

            if (this.$refs.meetingDate.value == '') {
                this.createFormErrorMsg = 'La fecha de momento de inicio es requerida.'
                this.$refs.meetingDate.focus();
                return;
            }

            if (this.$refs.meetingDuration.value <= 0) {
                this.createFormErrorMsg = 'Inserte la duración de la Videoconferencia. ';
                this.$refs.meetingDuration.focus();
                return;
            }

            let dataFormatted = this.$refs.meetingDate.value + 'T' + this.$refs.meetingTime.value + ':00';

            const params = {
                name: this.$refs.meetingName.value,
                user_id: this.user_id,
                record: (this.$refs.meetingRecord.checked) ? 1 : 0,
                notify: (this.$refs.meetingSendWarnings.checked) ? 1 : 0,
                meetingDate: dataFormatted,
                meetingDuration: this.$refs.meetingDuration.value
            };

            this.axios.get(this.course_id + '/create', { params })
                .then(() => this.getMeetings())
                .then(() => this.newMeetingBox = false)
                .then(() => this.$refs.meetingName.value = '')
                .then(() => this.$refs.meetingDate.value = '')
                .then(() => this.createFormErrorMsg = '');

        },
        joinMeeting(meetingID = Number, moderatorPW = String) {
            console.log('join meeting ' + meetingID);

            const params = {
                fullName: this.fullName,
                meetingID,
                password: moderatorPW
            };

            this.axios.get(this.course_id + '/join', { params })
                .then(response => this.openInNewTab(response.data.response.url));

        },
        playMeeting(url) {
            console.log('play meeting ' + url)
            this.openInNewTab(url)
        },
        confirmRemove(meetingID) {
            console.log('confirm remove ' + meetingID);
            this.selectedMeeting = { meetingID };
            this.showModal = !this.showModal;
        },
        confirmRemoveRecord(recordID) {
            console.log('confirm remove ' + recordID);
            this.selectedRecord = { recordID };
            this.removeRecordModal = !this.removeRecordModal;
        },
        removeRecord() {
            console.log('remove meeting ' + this.selectedRecord.recordID);

            const params = {
                recordID: this.selectedRecord.recordID
            };

            this.axios.get(this.course_id + '/record/delete', { params })
                .then(response => {
                    console.log(response.data.response)
                })
                .then(() => this.getMeetings())
                .then(() => this.removeRecordModal = !this.removeRecordModal);

        },
        removeMeeting() {
            console.log('remove meeting ' + this.selectedMeeting.meetingID);

            this.axios.get(this.course_id + '/remove/' + this.selectedMeeting.meetingID)
                .then(response => {
                    console.log(response.data.response)
                })
                .then(() => this.getMeetings())
                .then(() => this.showModal = !this.showModal);

        },
        sanitizeInput(str) {
            let temp = document.createElement('div');
            temp.textContent = str;
            return temp.innerHTML;
        },
        openInNewTab(url) {
            var win = window.open(url, '_blank');
            win.focus();
        },
    }
}

window.BBBIntegration = BBBIntegration