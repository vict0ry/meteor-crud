Template.chart.helpers({
        tasks() {
            return Tasks.find({"isDone":true});
			
        }
});