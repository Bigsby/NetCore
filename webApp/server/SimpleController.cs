using Microsoft.AspNetCore.Mvc;

public class Simple : Controller
{
    public string TheAction()
    {
        return "This is a simple action";        
    }
    
    public string Send(string value)
    {
        return $"You sent: {value}";    
    }
    
    public Item GetItem(string name, int @value)
    {
        return new Item
        {
            Name = name,
            Value = @value    
        };
    }
}