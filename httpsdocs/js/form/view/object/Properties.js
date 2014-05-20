Ext.namespace('CB.form.view.object');

CB.form.view.object.Properties = Ext.extend(CB.PluginsPanel, {
    initComponent: function(){
        CB.form.view.object.Properties.superclass.initComponent.apply(this, arguments);
    }

    ,getContainerToolbarItems: function() {
        var rez = {
            tbar: {}
            ,menu: {
                reload: {}
                ,'delete': { addDivider: 'top' }
                ,'permissions': { addDivider: 'top' }
            }
        };
        rez.tbar['edit'] = {};
        rez.tbar['openInTabsheet'] = {};

        if(!Ext.isEmpty(this.loadedParams)) {
            switch(CB.DB.templates.getType(this.loadedParams.template_id)) {
                case 'file':
                    rez.tbar['download'] = {};
                    break;
                case 'search':
                    rez.tbar['search'] = {};
                    break;
            }
        }

        this.items.each(
            function(i) {
                var pi = i.getContainerToolbarItems();

                if(pi.tbar) {
                    rez.tbar = Ext.apply(rez.tbar, pi.tbar);
                }
                if(pi.menu) {
                    /* adding dividesrs for first item of each plugin */
                    var isFirstItem = true;
                    Ext.iterate(
                        pi.menu
                        ,function(key, value){
                            if(isFirstItem) {
                                value.addDivider = 'top';
                                isFirstItem = false;
                            } else {
                                return false;
                            }
                        }
                        ,this
                    );

                    rez.menu = Ext.apply(rez.menu, pi.menu);
                }
            }
            ,this
        );

        return rez;
    }

    ,setSelectedVersion: function(params) {
        this.items.each(
            function(i) {
                if(i.setSelectedVersion) {
                    i.setSelectedVersion(params);
                }
            }
            ,this
        );
    }

});

Ext.reg('CBObjectProperties', CB.form.view.object.Properties);