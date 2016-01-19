module.exports = {
    find: function(Table, options){
        // query the table
        var query = Table.find(options.findQuery);

        options.sort.forEach(function(sortQuery){
            query = query.sort(sortQuery);
        })

        // populate fields if required
        options.populate.forEach(function(field) {
            query = query.populate(field);
        });

        // do pagination
        query = query.paginate({
            limit: options.perPage,
            page: options.page
        });

        return query;
    },

    count: function(Table, options){

        var query = Table.find(options.findQuery);

        // populate fields if required
        options.populate.forEach(function(field) {
            query = query.populate(field);
        });

        return query.then( function(results) {
            if ( results )
                return results.length;
            else
                return 0;
        });
    }
}
